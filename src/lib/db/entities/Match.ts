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

  @OneToOne("User")
  @JoinColumn()
  userC?: any;

  @Column({ default: false })
  isFinalized!: boolean;

  @Column()
  compatibilityScore!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
