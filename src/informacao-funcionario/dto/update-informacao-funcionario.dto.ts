import { PartialType } from '@nestjs/mapped-types';
import { CreateInformacaoFuncionarioDto } from './create-informacao-funcionario.dto';

export class UpdateInformacaoFuncionarioDto extends PartialType(CreateInformacaoFuncionarioDto) {}
