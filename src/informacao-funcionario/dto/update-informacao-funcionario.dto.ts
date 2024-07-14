import { CreateInformacaoFuncionarioDto } from './create-informacao-funcionario.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInformacaoFuncionarioDto extends PartialType(CreateInformacaoFuncionarioDto) {}
