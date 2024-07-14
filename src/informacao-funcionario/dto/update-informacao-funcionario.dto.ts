import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class EnderecoFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  cep: string;
}

class DadosBancariosFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  banco: string;

  @IsString()
  @IsNotEmpty()
  agencia: string;

  @IsString()
  @IsNotEmpty()
  conta: string;

  @IsString()
  @IsNotEmpty()
  tipoConta: string;
}

export class UpdateInformacaoFuncionarioDto {
  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsNumber()
  salario?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  data_nascimento?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  data_cadastro?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  data_desligamento?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => EnderecoFuncionarioDto)
  id_endereco_funcionario?: EnderecoFuncionarioDto; // Permite o objeto completo

  @IsOptional()
  @ValidateNested()
  @Type(() => DadosBancariosFuncionarioDto)
  id_dados_bancarios?: DadosBancariosFuncionarioDto; // Inclui todos os dados bancários

  @IsOptional()
  ativo?: boolean;
}
