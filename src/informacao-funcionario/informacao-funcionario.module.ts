import { Module } from '@nestjs/common';
import { InformacaoFuncionarioService } from './informacao-funcionario.service';
import { InformacaoFuncionarioController } from './informacao-funcionario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformacaoFuncionario } from './entities/informacao-funcionario.entity';
import { EnderecoFuncionario } from 'src/endereco_funcionario/entities/endereco_funcionario.entity';
import { DadosBancariosFuncionario } from 'src/dados-bancarios-funcionaario/entities/dados-bancarios-funcionaario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InformacaoFuncionario, EnderecoFuncionario,DadosBancariosFuncionario]), // Ensure both entities are included
  ],
  controllers: [InformacaoFuncionarioController],
  providers: [InformacaoFuncionarioService],
})
export class InformacaoFuncionarioModule {}
