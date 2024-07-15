// src/funcionario/dto/create-funcionario.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInformacaoFuncionarioDto } from 'src/informacao-funcionario/dto/create-informacao-funcionario.dto';

class EnderecoFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

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

export class CreateFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @Type(() => CreateInformacaoFuncionarioDto)
  @IsNotEmpty()
  informacoes_cadastro_funcionario: {
    id_endereco_funcionario: EnderecoFuncionarioDto;
    id_dados_bancarios: DadosBancariosFuncionarioDto;
    data_nascimento: string;
    data_cadastro: string;
    data_desligamento?: string;
  };
}
