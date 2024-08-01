import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PassportModule,ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.development.local'],
  }),JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '2d'}
  }),
  forwardRef(() => UsuarioModule),
],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,LocalAuthGuard],
  exports: [AuthService], 
})
export class AuthModule {}
