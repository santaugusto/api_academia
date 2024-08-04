import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { InformacaoFuncionario } from 'src/informacao-funcionario/entities/informacao-funcionario.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('funcionario')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id_funcionario: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  cargo: string;

  @Column()
  senha: string;

  @ManyToOne(() => InformacaoFuncionario, { cascade: true, nullable: true })
  @JoinColumn({ name: 'id_informacoes_cadastro_funcionario' })
  informacoes_cadastro_funcionario?: InformacaoFuncionario;

  @OneToOne(() => Usuario, usuario => usuario.funcionario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
