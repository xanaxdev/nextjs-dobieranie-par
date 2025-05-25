import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne("User")
  @JoinColumn()
  userA!: any;

  @OneToOne("User")
  @JoinColumn()
  userB!: any;

  @Column()
  compatibilityScore!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
