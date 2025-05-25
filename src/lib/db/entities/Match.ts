import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User)
  @JoinColumn()
  userA!: User;

  @OneToOne(() => User)
  @JoinColumn()
  userB!: User;

  @Column()
  compatibilityScore!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
