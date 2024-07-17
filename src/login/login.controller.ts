import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './entities/login.entity';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() createLoginDto: CreateLoginDto): Promise<Login> {
    return this.loginService.create(createLoginDto);
  }

  @Get()
  findAll(): Promise<Login[]> {
    return this.loginService.findAll();
  }
  
  @Get(':email')
  finfByEmail(@Param('email') email: string): Promise<Login> {
    return this.loginService.finfByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Login> {
    return this.loginService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.loginService.remove(id);
  }
}
