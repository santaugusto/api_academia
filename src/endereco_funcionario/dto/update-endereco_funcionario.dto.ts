import { PartialType } from '@nestjs/mapped-types';
import { CreateEnderecoFuncionarioDto } from './create-endereco_funcionario.dto';

export class UpdateEnderecoFuncionarioDto extends PartialType(CreateEnderecoFuncionarioDto) {}
