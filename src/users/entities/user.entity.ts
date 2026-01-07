import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../../auth/enums/role.enum';
import { Question } from '../../questions/entities/question.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 40, nullable: false })
  firstName: string;
  @Column({ type: 'varchar', length: 40, nullable: false })
  lastName: string;
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  username: string;
  @Column({ type: 'text', nullable: false, select: false })
  password: string;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  role: Role;
  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];
}
