import { AppDataSource, connectDB } from "@/lib/db/connection";
import { Match } from "@/lib/db/entities/Match";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const matchRepo = AppDataSource.getRepository(Match);

    const allMatches = await matchRepo.find({
      relations: ["userA", "userB", "userC"],
      order: { compatibilityScore: "DESC" },
    });

    const finalized = allMatches.some((m) => m.isFinalized);

    const data = allMatches
      .filter((m) => m.isFinalized)
      .map((m) => ({
        users: [m.userA.name, m.userB.name, m.userC?.name].filter(Boolean),
        score: m.compatibilityScore,
      }));

    return NextResponse.json({ pairs: data, finalized });
  } catch (err) {
    console.error("Błąd w API /match:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
