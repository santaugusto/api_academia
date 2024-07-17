import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import {  UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]),
  forwardRef(() => AuthModule),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports:[UsuarioService],
})
export class UsuarioModule { }
