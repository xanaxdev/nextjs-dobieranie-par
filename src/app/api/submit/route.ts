import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/db/connection";
import { User } from "@/lib/db/entities/User";
import { Answer } from "@/lib/db/entities/Answer";
import { Match } from "@/lib/db/entities/Match";
import { connectDB } from "@/lib/db/connection";
import { matchUsers } from "@/services/matchUsers";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    const { name, answers } = data;

    if (!name || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // 1. Zapisz użytkownika
    const userRepo = AppDataSource.getRepository(User);
    const answerRepo = AppDataSource.getRepository(Answer);
    const matchRepo = AppDataSource.getRepository(Match);

    const user = await userRepo.save({ name });

    // 2. Zapisz odpowiedzi
    const savedAnswers = answers.map((a: any) =>
      answerRepo.create({
        user,
        questionId: a.questionId,
        value: a.value,
      })
    );
    await answerRepo.save(savedAnswers);

    // 3. Przelicz wszystkie dopasowania
    await matchUsers();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Błąd API /submit:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
