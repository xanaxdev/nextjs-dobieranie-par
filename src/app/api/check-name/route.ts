import { AppDataSource } from "@/lib/db/connection";
import { connectDB } from "@/lib/db/connection";
import { User } from "@/lib/db/entities/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) return NextResponse.json({ valid: false });

  const user = await AppDataSource.getRepository(User).findOne({
    where: { name },
  });

  return NextResponse.json({ exists: !!user });
}
