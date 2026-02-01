import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Answer } from './answer.entity';
import { User } from '../../users/entities/user.entity';
@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;
  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
  })
  answers: Answer[];
  @ManyToOne(() => User, (user) => user.questions, {
    onDelete: 'CASCADE',
  })
  user: User;
}
