import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInformacaoFuncionarioDto } from 'src/informacao-funcionario/dto/create-informacao-funcionario.dto'; 

export class UpdateFuncionarioDto {
    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsString()
    senha?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    @IsString()
    cargo?: string;

    @ValidateNested()
    @Type(() => CreateInformacaoFuncionarioDto)
    @IsOptional()
    informacoes_cadastro_funcionario?: CreateInformacaoFuncionarioDto; // Pode ser vazio
}
