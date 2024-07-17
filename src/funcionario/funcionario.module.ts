import { Usuario } from './../usuario/entities/usuario.entity';
import { EnderecoFuncionarioModule } from './../endereco_funcionario/endereco_funcionario.module';
import { DadosBancariosFuncionario } from 'src/dados-bancarios-funcionaario/entities/dados-bancarios-funcionaario.entity';
import { EnderecoFuncionario } from 'src/endereco_funcionario/entities/endereco_funcionario.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { Funcionario } from './entities/funcionario.entity';
import { InformacaoFuncionario } from '../informacao-funcionario/entities/informacao-funcionario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Funcionario, 
      InformacaoFuncionario, 
      EnderecoFuncionario, 
      DadosBancariosFuncionario,
      Usuario,
    ]),
    EnderecoFuncionarioModule,
  ],
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
})
export class FuncionarioModule {}
