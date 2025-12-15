import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string;
}
