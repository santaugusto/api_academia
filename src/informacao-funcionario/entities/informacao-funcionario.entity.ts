import { DadosBancariosFuncionario } from 'src/dados-bancarios-funcionaario/entities/dados-bancarios-funcionaario.entity';
import { EnderecoFuncionario } from 'src/endereco_funcionario/entities/endereco_funcionario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('informacoes_cadastro_funcionario')
export class InformacaoFuncionario {
  @PrimaryGeneratedColumn()
  id_informacoes_cadastro_funcionario: number;

  @OneToOne(() => EnderecoFuncionario)
  @JoinColumn({ name: 'id_endereco_funcionario' })
  id_endereco_funcionario: EnderecoFuncionario;

  @OneToOne(() => DadosBancariosFuncionario)
  @JoinColumn({ name: 'id_dados_bancarios' })
  id_dados_bancarios: DadosBancariosFuncionario;

  @Column('text')
  telefone: string;

  @Column('text')
  cpf: string;

  @Column('float')
  salario: number;

  @Column('date')
  data_nascimento: Date;

  @Column('date', { nullable: true })
  data_desligamento: Date;

  @Column('date')
  data_cadastro: Date;

  @Column('bool')
  ativo: boolean;
}
