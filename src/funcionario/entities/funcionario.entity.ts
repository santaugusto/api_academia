import { InformacaoFuncionario } from './../../informacao-funcionario/entities/informacao-funcionario.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('funcionario')
export class Funcionario {
    @PrimaryGeneratedColumn()
    id_funcionario: number;
  
    @Column()
    nome: string;
  
    @Column()
    senha: string;
  
    @Column()
    email: string;
  
    @Column()
    cargo: string;
  
    @ManyToOne(() => InformacaoFuncionario, { cascade: true })
    @JoinColumn({ name: 'id_informacoes_cadastro_funcionario' })
    informacoes_cadastro_funcionario?: InformacaoFuncionario;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' }) 
    id_usuario: Usuario;
    
  }