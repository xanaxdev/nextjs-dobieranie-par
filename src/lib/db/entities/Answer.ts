import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.answers, { onDelete: "CASCADE" })
  user!: User;

  @Column()
  questionId!: number;

  @Column()
  value!: string;
}
