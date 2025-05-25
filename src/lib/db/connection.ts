import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Answer } from "./entities/Answer";
import { Match } from "./entities/Match";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // Uwaga: tylko na dev! W produkcji lepiej użyć migracji.
  logging: false,
  entities: [User, Answer, Match],
});

export async function connectDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}
