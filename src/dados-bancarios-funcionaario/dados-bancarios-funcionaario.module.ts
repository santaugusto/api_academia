import { Module } from '@nestjs/common';
import { DadosBancariosFuncionarioService } from './dados-bancarios-funcionaario.service';
import { DadosBancariosFuncionaarioController } from './dados-bancarios-funcionaario.controller';
import { DadosBancariosFuncionario } from './entities/dados-bancarios-funcionaario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DadosBancariosFuncionario])],
  controllers: [DadosBancariosFuncionaarioController],
  providers: [DadosBancariosFuncionarioService],
})
export class DadosBancariosFuncionaarioModule {}
