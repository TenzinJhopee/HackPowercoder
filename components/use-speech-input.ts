"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Minimal typings: SpeechRecognition is not in lib.dom for this TypeScript version. */
type RecognitionResult = { isFinal: boolean; 0: { transcript: string } };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type RecognitionCtor = new () => Recognition;

function getCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Push-to-talk speech input with interim results (Chrome). `onText(text, final)` fires on every update. */
export function useSpeechInput(onText: (text: string, final: boolean) => void) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recognition = useRef<Recognition | null>(null);
  const callback = useRef(onText);
  callback.current = onText;

  useEffect(() => {
    setSupported(getCtor() !== null);
    return () => recognition.current?.abort();
  }, []);

  const start = useCallback(() => {
    const Ctor = getCtor();
    if (!Ctor || recognition.current) return;
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (event) => {
      let text = "";
      let final = false;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
        if (event.results[i].isFinal) final = true;
      }
      callback.current(text.trim(), final);
    };
    const done = () => {
      recognition.current = null;
      setListening(false);
    };
    rec.onend = done;
    rec.onerror = done;
    recognition.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      done();
    }
  }, []);

  const stop = useCallback(() => recognition.current?.stop(), []);

  return { supported, listening, start, stop };
}
