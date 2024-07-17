import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[PassportModule,
  forwardRef(() => UsuarioModule),
],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy],
  exports: [AuthService], 
})
export class AuthModule {}
