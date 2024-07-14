import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EnderecoFuncionario')
export class EnderecoFuncionario {
    
  @PrimaryGeneratedColumn({name:'id_endereco_funcionario'})
  id_endereco_funcionario: number;

  @Column({name:'rua'})
  rua: string;

  @Column({name:'numero'})
  numero: string;

  @Column({name:'bairro'})
  bairro: string;

  @Column({name:"cidade"})
  cidade: string;

  @Column({name:'estado'})
  estado: string;

  @Column({name: 'cep', length:10})
  cep: string;
}