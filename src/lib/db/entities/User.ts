import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { Match } from "./Match";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Answer, (answer) => answer.user, { cascade: true })
  answers!: Answer[];

  @OneToOne(() => Match, (match) => match.userA)
  matchA!: Match;

  @OneToOne(() => Match, (match) => match.userB)
  matchB!: Match;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
