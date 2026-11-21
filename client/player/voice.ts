import { audioKey, type SpeechPayload, type VoiceManifest, type WordTiming } from "@/lib/contracts";

/** Which way a line was (or will be) spoken. */
export type VoicePath = "pregen" | "live" | "browser" | "silent";

/** Called once per word of the line, in order, at the word's start. `index` refers to `splitWords(text)`. */
export type WordListener = (index: number, word: string) => void;

/** The minimum the player needs; tests inject a fake. */
export interface Speaker {
  /** Speaks one line. Resolves true when it finished, false when `stop()` cut it off. Never rejects. */
  speak(text: string, onWord?: WordListener): Promise<boolean>;
  /** Stops immediately (pauses audio, cancels speech synthesis, stops the clock). */
  stop(): void;
}

export type VoiceStatus = {
  backup: boolean;
  muted: boolean;
  /** Manifest loaded with at least one entry. null = not checked yet. */
  pregen: boolean | null;
  /** Live TTS endpoint answered. null = not tried yet; always false in backup mode. */
  live: boolean | null;
  /** Browser speechSynthesis exists. */
  browser: boolean;
  lastPath: VoicePath | null;
};

export type VoiceOptions = {
  backup?: boolean;
  muted?: boolean;
  fetch?: typeof fetch;
  /** Default "/voice". */
  baseUrl?: string;
  /** Default `${baseUrl}/manifest.json`. */
  manifestUrl?: string;
  /** Default "/api/voice/speak". */
  speakUrl?: string;
  /** Fire words this many seconds early (0.02-0.06 for things that must be read). Default 0. */
  leadSeconds?: number;
  /** Live TTS timeout in ms. Default 8000. */
  liveTimeoutMs?: number;
  onStatus?: (status: VoiceStatus) => void;
};

export type TextWord = { word: string; charStart: number; charEnd: number };

/** `?backup=1` in the URL. Safe on the server (returns false). */
export function isBackupMode(search?: string): boolean {
  const query = search ?? (typeof location !== "undefined" ? location.search : "");
  const value = new URLSearchParams(query).get("backup");
  return value !== null && value !== "0" && value !== "false";
}

/** Lowercase (English locale), strip apostrophes and punctuation. Used to match cue words. */
export function normalizeWord(word: string): string {
  return word
    .toLocaleLowerCase("en")
    .replace(/['’‘`]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

/** Whitespace-separated words of a line, edge punctuation kept for captions. Punctuation-only tokens are dropped. */
export function splitWords(text: string): TextWord[] {
  const words: TextWord[] = [];
  const pattern = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (!/[\p{L}\p{N}]/u.test(match[0])) continue;
    words.push({ word: match[0], charStart: match.index, charEnd: match.index + match[0].length });
  }
  return words;
}

/** Silent-clock timings: ~60 ms per character, digits weighted x3.5, plus a short gap per word. */
export function estimateTimings(text: string, msPerChar = 60): WordTiming[] {
  let t = 0.15;
  return splitWords(text).map((w) => {
    let weight = 0;
    for (const char of w.word) weight += /\d/.test(char) ? 3.5 : /[\p{L}]/u.test(char) ? 1 : 0.5;
    const duration = (weight * msPerChar) / 1000;
    const timing: WordTiming = { word: w.word, start: t, end: t + duration, charStart: w.charStart, charEnd: w.charEnd };
    t += duration + msPerChar / 1000;
    return timing;
  });
}

/** Start time (s) of each text word, taken from measured timings (matched by character offset, then by index). */
export function wordStarts(words: TextWord[], timings: WordTiming[]): number[] {
  if (timings.length === words.length) return timings.map((t) => t.start);
  const starts: number[] = [];
  let last = 0;
  for (const w of words) {
    const hit = timings.find((t) => t.charEnd > w.charStart && t.charStart < w.charEnd);
    last = hit ? hit.start : last;
    starts.push(last);
  }
  return starts;
}

type Clip = { src: string; timings: WordTiming[] };

const raf: (cb: () => void) => unknown =
  typeof requestAnimationFrame === "function" ? (cb) => requestAnimationFrame(cb) : (cb) => setTimeout(cb, 16);
const now = (): number => (typeof performance !== "undefined" ? performance.now() : Date.now());

/**
 * Speaks a line and reports word starts. Order: pre-generated audio, live TTS (not in backup mode),
 * browser speechSynthesis, silent clock. A failing path falls through to the next one.
 */
export class Voice implements Speaker {
  private readonly opts: Required<Omit<VoiceOptions, "onStatus" | "fetch">> & Pick<VoiceOptions, "onStatus">;
  private readonly fetcher: typeof fetch;
  private manifest: Promise<VoiceManifest> | null = null;
  private line = 0;
  private audio: HTMLAudioElement | null = null;
  private settle: ((completed: boolean) => void) | null = null;
  private liveAbort: AbortController | null = null;
  private state: VoiceStatus;

  constructor(options: VoiceOptions = {}) {
    const baseUrl = options.baseUrl ?? "/voice";
    this.opts = {
      backup: options.backup ?? isBackupMode(),
      muted: options.muted ?? false,
      baseUrl,
      manifestUrl: options.manifestUrl ?? `${baseUrl}/manifest.json`,
      speakUrl: options.speakUrl ?? "/api/voice/speak",
      leadSeconds: options.leadSeconds ?? 0,
      liveTimeoutMs: options.liveTimeoutMs ?? 8000,
      onStatus: options.onStatus,
    };
    this.fetcher = options.fetch ?? ((input, init) => fetch(input, init));
    this.state = {
      backup: this.opts.backup,
      muted: this.opts.muted,
      pregen: null,
      live: this.opts.backup ? false : null,
      browser: typeof window !== "undefined" && "speechSynthesis" in window,
      lastPath: null,
    };
  }

  status(): VoiceStatus {
    return { ...this.state };
  }

  /** Fine-print text, e.g. "Voice: pre-generated · live voice off (backup mode)". */
  statusLine(): string {
    const s = this.state;
    const parts = [
      s.muted ? "sound off" : s.pregen ? "pre-generated audio" : s.pregen === false ? "no pre-generated audio" : "pre-generated audio unchecked",
      s.backup ? "live voice off (backup mode)" : s.live === false ? "live voice unavailable" : s.live ? "live voice" : "live voice untried",
      s.browser ? "browser voice" : "no browser voice",
    ];
    return `Voice: ${parts.join(" · ")}${s.lastPath ? ` · last: ${s.lastPath}` : ""}`;
  }

  /** Sound button: muted lines still run the clock (with measured timings when pre-generated). */
  setMuted(muted: boolean): void {
    if (muted) this.stop();
    this.update({ muted });
  }

  /** Loads the manifest and warms the HTTP cache for the given lines. Same-origin static files only. */
  async preload(texts: string[]): Promise<void> {
    const manifest = await this.loadManifest();
    await Promise.all(
      texts.map(async (text) => {
        const entry = manifest[audioKey(text)];
        if (!entry) return;
        await Promise.all([this.fetcher(this.fileUrl(entry.audio, ".mp3")), this.fetcher(this.fileUrl(entry.timings, ".json"))]).catch(() => undefined);
      }),
    );
  }

  stop(): void {
    this.line++;
    this.liveAbort?.abort();
    this.liveAbort = null;
    if (this.audio) {
      this.audio.pause();
      this.audio.src = "";
      this.audio = null;
    }
    if (this.state.browser) window.speechSynthesis.cancel();
    const settle = this.settle;
    this.settle = null;
    settle?.(false);
  }

  async speak(rawText: string, onWord?: WordListener): Promise<boolean> {
    this.stop();
    const line = this.line;
    const alive = () => this.line === line;
    const text = rawText.trim();
    const words = splitWords(text);
    let fired = -1;
    const fireUpTo = (index: number) => {
      while (fired < index && fired < words.length - 1) {
        fired++;
        onWord?.(fired, words[fired].word);
      }
    };
    const finishAll = () => fireUpTo(words.length - 1);

    try {
      // (a) Pre-generated audio.
      const clip = await this.pregenClip(text);
      if (!alive()) return false;
      if (clip) {
        const starts = wordStarts(words, clip.timings);
        const end = clip.timings.length ? clip.timings[clip.timings.length - 1].end : 0;
        if (!this.state.muted) {
          const played = await this.playAudio(line, clip.src, starts, fireUpTo, finishAll);
          if (played !== null) return this.used("pregen", played);
          if (!alive()) return false;
        }
        return this.used("silent", await this.runClock(line, starts, end, fireUpTo, finishAll));
      }

      // (b) Live TTS, never in backup mode.
      if (!this.state.backup && !this.state.muted && this.state.live !== false) {
        const payload = await this.fetchLive(text);
        if (!alive()) return false;
        if (payload?.audioBase64) {
          const src = `data:${payload.mimeType ?? "audio/mpeg"};base64,${payload.audioBase64}`;
          const starts = wordStarts(words, payload.words);
          const played = await this.playAudio(line, src, starts, fireUpTo, finishAll);
          if (played !== null) return this.used("live", played);
          if (!alive()) return false;
        }
      }

      // (c) Browser speechSynthesis.
      if (this.state.browser && !this.state.muted) {
        const spoken = await this.speakBrowser(line, text, words, fireUpTo, finishAll);
        if (spoken !== null) return this.used("browser", spoken);
        if (!alive()) return false;
      }

      // (d) Silent clock.
      const timings = estimateTimings(text);
      const end = timings.length ? timings[timings.length - 1].end : 0.3;
      return this.used("silent", await this.runClock(line, timings.map((t) => t.start), end, fireUpTo, finishAll));
    } catch (reason) {
      console.error("Voice failed", reason);
      if (alive()) finishAll();
      return alive();
    }
  }

  // ---------- internals ----------

  private used(path: VoicePath, completed: boolean): boolean {
    if (this.state.lastPath !== path) this.update({ lastPath: path });
    return completed;
  }

  private update(patch: Partial<VoiceStatus>): void {
    this.state = { ...this.state, ...patch };
    this.opts.onStatus?.(this.status());
  }

  private fileUrl(file: string, ext: string): string {
    if (/^(https?:)?\//.test(file)) return file;
    return `${this.opts.baseUrl}/${/\.[a-z0-9]+$/i.test(file) ? file : file + ext}`;
  }

  private loadManifest(): Promise<VoiceManifest> {
    if (!this.manifest) {
      this.manifest = this.fetcher(this.opts.manifestUrl)
        .then((res) => (res.ok ? (res.json() as Promise<VoiceManifest>) : {}))
        .catch(() => ({}) as VoiceManifest)
        .then((manifest) => {
          this.update({ pregen: Object.keys(manifest).length > 0 });
          return manifest;
        });
    }
    return this.manifest;
  }

  private async pregenClip(text: string): Promise<Clip | null> {
    const entry = (await this.loadManifest())[audioKey(text)];
    if (!entry || entry.text.trim() !== text) return null;
    try {
      const res = await this.fetcher(this.fileUrl(entry.timings, ".json"));
      if (!res.ok) return null;
      const data = (await res.json()) as SpeechPayload | WordTiming[];
      const timings = Array.isArray(data) ? data : data.words ?? [];
      return { src: this.fileUrl(entry.audio, ".mp3"), timings };
    } catch {
      return null;
    }
  }

  private async fetchLive(text: string): Promise<SpeechPayload | null> {
    const abort = new AbortController();
    this.liveAbort = abort;
    const timer = setTimeout(() => abort.abort(), this.opts.liveTimeoutMs);
    try {
      const res = await this.fetcher(this.opts.speakUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: abort.signal,
      });
      if (res.status === 503) {
        this.update({ live: false });
        return null;
      }
      if (!res.ok) return null;
      const payload = (await res.json()) as SpeechPayload;
      if (this.state.live !== true) this.update({ live: true });
      return payload;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
      if (this.liveAbort === abort) this.liveAbort = null;
    }
  }

  /** Resolves true/false like speak(); null when the audio could not start (caller falls back). */
  private playAudio(line: number, src: string, starts: number[], fireUpTo: (i: number) => void, finishAll: () => void): Promise<boolean | null> {
    if (typeof Audio === "undefined") return Promise.resolve(null);
    const audio = new Audio(src);
    this.audio = audio;
    return new Promise<boolean | null>((resolve) => {
      let started = false;
      let done = false;
      const finish = (value: boolean | null) => {
        if (done) return;
        done = true;
        if (this.settle === settle) this.settle = null;
        resolve(value);
      };
      const settle = (completed: boolean) => finish(completed);
      this.settle = settle;
      const tick = () => {
        if (done || this.line !== line) return;
        const t = audio.currentTime + this.opts.leadSeconds;
        let i = -1;
        while (i + 1 < starts.length && starts[i + 1] <= t) i++;
        fireUpTo(i);
        raf(tick);
      };
      audio.onended = () => {
        if (this.line !== line) return;
        finishAll();
        if (this.audio === audio) this.audio = null;
        finish(true);
      };
      audio.onerror = () => {
        if (this.line === line && !started) finish(null);
      };
      audio
        .play()
        .then(() => {
          started = true;
          raf(tick);
        })
        .catch(() => {
          if (this.audio === audio) this.audio = null;
          finish(this.line === line ? null : false);
        });
    });
  }

  private runClock(line: number, starts: number[], end: number, fireUpTo: (i: number) => void, finishAll: () => void): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const t0 = now();
      let done = false;
      const settle = (completed: boolean) => {
        if (done) return;
        done = true;
        if (this.settle === settle) this.settle = null;
        resolve(completed);
      };
      this.settle = settle;
      const tick = () => {
        if (done || this.line !== line) return;
        const t = (now() - t0) / 1000 + this.opts.leadSeconds;
        let i = -1;
        while (i + 1 < starts.length && starts[i + 1] <= t) i++;
        fireUpTo(i);
        if (t >= end + 0.15) {
          finishAll();
          settle(true);
          return;
        }
        raf(tick);
      };
      raf(tick);
    });
  }

  private speakBrowser(line: number, text: string, words: { charStart: number }[], fireUpTo: (i: number) => void, finishAll: () => void): Promise<boolean | null> {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    const english = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("en"));
    if (english) utterance.voice = english;
    // Some voices never send boundary events: an estimated clock drives the words until one arrives.
    const estimate = estimateTimings(text).map((t) => t.start);

    return new Promise<boolean | null>((resolve) => {
      let done = false;
      let started = false;
      let boundaries = false;
      let t0 = 0;
      const finish = (value: boolean | null) => {
        if (done) return;
        done = true;
        clearTimeout(watchdog);
        if (this.settle === settle) this.settle = null;
        resolve(value);
      };
      const settle = (completed: boolean) => finish(completed);
      this.settle = settle;
      // Chrome sometimes never starts an utterance; fall through to the clock.
      const watchdog = setTimeout(() => {
        if (!started && this.line === line) {
          synth.cancel();
          finish(null);
        }
      }, 1500);
      const tick = () => {
        if (done || boundaries || this.line !== line) return;
        const t = (now() - t0) / 1000;
        let i = -1;
        while (i + 1 < estimate.length && estimate[i + 1] <= t) i++;
        fireUpTo(i);
        raf(tick);
      };
      utterance.onstart = () => {
        started = true;
        t0 = now();
        raf(tick);
      };
      utterance.onboundary = (event) => {
        if (this.line !== line || (event.name && event.name !== "word")) return;
        boundaries = true;
        let i = -1;
        while (i + 1 < words.length && words[i + 1].charStart <= event.charIndex) i++;
        fireUpTo(i);
      };
      utterance.onend = () => {
        if (this.line !== line) return;
        finishAll();
        finish(true);
      };
      utterance.onerror = (event) => {
        if (this.line !== line || event.error === "interrupted" || event.error === "canceled") return finish(false);
        if (started) finishAll();
        finish(started ? true : null);
      };
      synth.speak(utterance);
    });
  }
}
