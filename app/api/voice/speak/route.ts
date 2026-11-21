import { z } from "zod";
import { speakWithGemini } from "@/lib/gemini-tts";

export const runtime = "nodejs";

const requestSchema = z.object({
  text: z.string().trim().min(1).max(4000)
}).strict();

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return Response.json({ error: "Speech generation is not configured. The text response is still available." }, { status: 503 });

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body containing text." }, { status: 400 });
  }
  const parsed = requestSchema.safeParse(input);
  if (!parsed.success) return Response.json({ error: "Text must contain between 1 and 4,000 characters." }, { status: 400 });

  try {
    const audio = await speakWithGemini(parsed.data.text, apiKey);
    return new Response(audio, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": String(audio.byteLength),
        "Cache-Control": "no-store"
      }
    });
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : "Gemini speech generation failed.";
    return Response.json(
      { error: `${message} The text response is still available.` },
      { status: 502 }
    );
  }
}
