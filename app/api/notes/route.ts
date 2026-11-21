import { z } from "zod";
import { deleteUserNote, getUserNotes, saveUserNote } from "@/lib/database";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getUserNotes(), { headers: { "Cache-Control": "no-store" } });
}

const noteSchema = z.object({
  subject: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(50),
  text: z.string().trim().max(1000).default("")
}).strict();

/** Saves the user's answer to an open question (subject = insight id). */
export async function POST(request: Request) {
  const parsed = noteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Send subject, answer and optional text." }, { status: 400 });
  await saveUserNote(parsed.data);
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const subject = new URL(request.url).searchParams.get("subject");
  if (!subject) return Response.json({ error: "Pass ?subject=" }, { status: 400 });
  await deleteUserNote(subject);
  return Response.json({ ok: true });
}
