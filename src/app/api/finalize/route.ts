import { NextResponse } from "next/server";
import { connectDB, AppDataSource } from "@/lib/db/connection";
import { Match } from "@/lib/db/entities/Match";

export async function POST() {
  try {
    await connectDB();
    const repo = AppDataSource.getRepository(Match);
    const all = await repo.find();
    const updated = all.map((m) => ({ ...m, isFinalized: true }));
    await repo.save(updated);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Finalize error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
