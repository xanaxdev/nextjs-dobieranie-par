import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/db/connection";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    return NextResponse.json({ message: "Połączono z bazą danych!" });
  } catch (error) {
    console.error("Błąd połączenia z bazą:", error);
    return NextResponse.json(
      { error: "Nie udało się połączyć z bazą." },
      { status: 500 }
    );
  }
}
