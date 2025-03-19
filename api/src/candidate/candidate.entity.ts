import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CandidateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  seniority: 'junior' | 'mid' | 'senior';

  @Column()
  years: number;

  @Column()
  availability: boolean;
}
