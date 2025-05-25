import { AppDataSource, connectDB } from "@/lib/db/connection";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectDB();
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    // Wyłącz FK
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 0`);

    // Usuń dane z tabel (z backtickami!)
    await queryRunner.query(`DELETE FROM \`match\``);
    await queryRunner.query(`DELETE FROM \`answer\``);
    await queryRunner.query(`DELETE FROM \`user\``);

    // Włącz FK
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 1`);
    await queryRunner.release();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reset error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
