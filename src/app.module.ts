import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FuncionariosModule } from './funcionarios/funcionarios.module';

@Module({
  imports: [FuncionariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
