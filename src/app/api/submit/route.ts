import { NextResponse } from "next/server";
import { AppDataSource, connectDB } from "@/lib/db/connection";
import { User } from "@/lib/db/entities/User";
import { Answer } from "@/lib/db/entities/Answer";
import { matchUsers } from "@/services/matchUsers";

type IncomingAnswer = {
  questionId: number;
  value: string;
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { name, answers } = data;

    if (!name || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const userRepo = AppDataSource.getRepository(User);
    const answerRepo = AppDataSource.getRepository(Answer);

    // ❗Sprawdź, czy imię już istnieje
    const existing = await userRepo.findOne({ where: { name } });
    if (existing) {
      return NextResponse.json(
        { error: "Imię już istnieje — wybierz inne." },
        { status: 409 }
      );
    }

    // 1. Zapisz użytkownika
    const user = await userRepo.save({ name });

    // 2. Zapisz odpowiedzi
    const savedAnswers = (answers as IncomingAnswer[]).map((a) =>
      answerRepo.create({
        user,
        questionId: a.questionId,
        value: a.value,
      })
    );
    await answerRepo.save(savedAnswers);

    // 3. Przelicz dopasowania
    await matchUsers();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Błąd API /submit:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
