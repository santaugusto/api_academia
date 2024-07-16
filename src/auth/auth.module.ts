import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
