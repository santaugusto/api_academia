import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInformacaoFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsNumber()
  @IsNotEmpty()
  salario: number;

  @IsDate()
  @Type(() => Date)
  data_nascimento: Date;

  @IsDate()
  @Type(() => Date)
  data_cadastro: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  data_desligamento?: Date;

  @IsNotEmpty()
  @IsNumber()
  id_endereco_funcionario?: number;

  @IsOptional()
  @IsString()
  rua?: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsNotEmpty()
  ativo: boolean;
};