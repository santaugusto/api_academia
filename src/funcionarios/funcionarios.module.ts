import { Module } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';

@Module({
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
})
export class FuncionariosModule {}
