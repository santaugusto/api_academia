import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login')
export class Login {
  @PrimaryGeneratedColumn()
  id_login: number;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  senha: string;
}
