import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity({ name: 'admins' })
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @IsString()
  login: string;

  @Column({})
  password: string;

  @Column({ default: false })
  isPresent: boolean;
}