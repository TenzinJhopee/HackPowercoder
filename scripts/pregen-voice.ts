import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { allLines } from "../content/scripts";
import { audioKey, type SpeechPayload, type VoiceManifest } from "../lib/contracts";
import { speakWithElevenLabs } from "../lib/elevenlabs";

/**
 * Pre-generates audio for every prepared line in content/scripts.ts (main beats, bridges, prepared side answers,
 * fixed lines) into public/voice/{audioKey(text)}.mp3 + .json and public/voice/manifest.json.
 * Lines whose files already exist are skipped. `--dry-run` lists lines and keys without calling ElevenLabs.
 */

try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local is optional.
}

const outDir = path.join("public", "voice");
const manifestPath = path.join(outDir, "manifest.json");

async function readManifest(): Promise<VoiceManifest> {
  try {
    return JSON.parse(await readFile(manifestPath, "utf8")) as VoiceManifest;
  } catch {
    return {};
  }
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const lines = allLines().map((text) => ({ text, key: audioKey(text) }));

  if (dryRun) {
    for (const { text, key } of lines) {
      const done = existsSync(path.join(outDir, `${key}.mp3`)) && existsSync(path.join(outDir, `${key}.json`));
      console.log(`${key}  ${done ? "have   " : "missing"}  ${text}`);
    }
    console.log(`${lines.length} lines, ${lines.filter(({ key }) => !existsSync(path.join(outDir, `${key}.mp3`))).length} to generate.`);
    return;
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error("ELEVENLABS_API_KEY is not set (use --dry-run to list the lines).");
  const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
  const modelId = process.env.ELEVENLABS_MODEL_ID || undefined;

  await mkdir(outDir, { recursive: true });
  const manifest = await readManifest();
  let generated = 0;
  for (const { text, key } of lines) {
    const audioFile = `${key}.mp3`;
    const timingsFile = `${key}.json`;
    if (existsSync(path.join(outDir, audioFile)) && existsSync(path.join(outDir, timingsFile))) {
      manifest[key] = { text, audio: audioFile, timings: timingsFile };
      continue;
    }
    const speech = await speakWithElevenLabs(text, voiceId, apiKey, fetch, modelId);
    const payload: SpeechPayload = { words: speech.words };
    await writeFile(path.join(outDir, audioFile), Buffer.from(speech.audioBase64, "base64"));
    await writeFile(path.join(outDir, timingsFile), JSON.stringify(payload, null, 2));
    manifest[key] = { text, audio: audioFile, timings: timingsFile };
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2)); // keep progress if a later line fails
    generated += 1;
    console.log(`${key}: ${speech.words.length} words  ${text}`);
  }
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`${generated} generated, ${lines.length - generated} already present.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
