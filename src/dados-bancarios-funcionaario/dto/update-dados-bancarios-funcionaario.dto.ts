import { PartialType } from '@nestjs/mapped-types';
import { CreateDadosBancariosFuncionaarioDto } from './create-dados-bancarios-funcionaario.dto';

export class UpdateDadosBancariosFuncionaarioDto extends PartialType(CreateDadosBancariosFuncionaarioDto) {}
