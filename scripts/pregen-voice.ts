import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { speakWithElevenLabs } from "../lib/elevenlabs";

try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local is optional.
}

const scriptSchema = z.array(z.object({ id: z.string().regex(/^[\w-]+$/), text: z.string().min(1) }));

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error("ELEVENLABS_API_KEY is not set.");
  const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
  const modelId = process.env.ELEVENLABS_MODEL_ID || undefined;
  const lines = scriptSchema.parse(JSON.parse(await readFile("content/script.json", "utf8")));
  const outDir = path.join("public", "voice");
  await mkdir(outDir, { recursive: true });
  for (const { id, text } of lines) {
    const speech = await speakWithElevenLabs(text, voiceId, apiKey, fetch, modelId);
    await writeFile(path.join(outDir, `${id}.mp3`), Buffer.from(speech.audioBase64, "base64"));
    await writeFile(path.join(outDir, `${id}.json`), JSON.stringify({ words: speech.words, alignment: speech.alignment }, null, 2));
    console.log(`${id}: ${speech.words.length} words`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
