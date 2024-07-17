import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Login]),
    AuthModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule { }
