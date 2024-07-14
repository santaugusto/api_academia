import { IsOptional, IsString } from "class-validator";

export class CreateDadosBancariosFuncionaarioDto {

    @IsOptional()
    @IsString()
    banco: string;

    @IsOptional()
    @IsString()
    agencia: string;

    @IsOptional()
    @IsString()
    conta: string;

    @IsOptional()
    @IsString()
    tipoConta: string;

}
