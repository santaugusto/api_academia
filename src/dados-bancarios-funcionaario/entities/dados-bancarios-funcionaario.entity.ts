import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dados_bancarios_funcionario')
export class DadosBancariosFuncionario {
  @PrimaryGeneratedColumn({ name: 'id_dados_bancarios' })
  idDadosBancarios: number;

  @Column()
  banco: string;

  @Column()
  agencia: string;

  @Column()
  conta: string;

  @Column({ name: 'tipo_conta' })
  tipoConta: string;
}
