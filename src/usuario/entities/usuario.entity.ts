import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Funcionario } from 'src/funcionario/entities/funcionario.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @OneToOne(() => Funcionario, funcionario => funcionario.usuario)
  funcionario: Funcionario;
}
