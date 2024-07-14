import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EnderecoFuncionario } from 'src/endereco_funcionario/entities/endereco_funcionario.entity';

@Entity('informacoes_cadastro_funcionario')
export class InformacaoFuncionario {
    @PrimaryGeneratedColumn()
    id_informacoes_cadastro_funcionario: number;

    @ManyToOne(() => EnderecoFuncionario)
    @JoinColumn({ name: 'id_endereco_funcionario' })
    id_endereco_funcionario: EnderecoFuncionario;

    @Column('text')
    telefone: string;

    @Column('text')
    cpf: string;

    @Column('float')
    salario: number;

    @Column('date')
    data_nascimento: string;

    @Column('date', { nullable: true })
    data_desligamento: string;

    @Column('date')
    data_cadastro: string;

    @Column('bool')
    ativo: boolean;
}
