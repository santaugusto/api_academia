import { Module } from '@nestjs/common';
import { EnderecoFuncionarioService } from './endereco_funcionario.service';
import { EnderecoFuncionarioController } from './endereco_funcionario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoFuncionario } from './entities/endereco_funcionario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnderecoFuncionario])],
  controllers: [EnderecoFuncionarioController],
  providers: [EnderecoFuncionarioService],
})
export class EnderecoFuncionarioModule {}
