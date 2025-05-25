import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne("User", "answers", { onDelete: "CASCADE" })
  user!: any; // lub: user!: User jeśli naprawdę chcesz silne typowanie

  @Column()
  questionId!: number;

  @Column()
  value!: string;
}
