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

  @ValidateNested()
  @Type(() => EnderecoFuncionarioDto)
  @IsNotEmpty()
  @IsOptional()
  id_endereco_funcionario: EnderecoFuncionarioDto;

  @ValidateNested()
  @Type(() => DadosBancariosFuncionarioDto)
  @IsNotEmpty()
  @IsOptional()
  id_dados_bancarios: DadosBancariosFuncionarioDto;

  @IsNotEmpty()
  ativo: boolean;
}
