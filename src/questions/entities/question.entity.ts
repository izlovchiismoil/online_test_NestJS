import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  title: string;
  @Column({ type: 'text' })
  trueAnswer: string;
  @Column({ type: 'text' })
  falseAnswer1: string;
  @Column({ type: 'text' })
  falseAnswer2: string;
  @Column({ type: 'text' })
  falseAnswer3: string;
}
