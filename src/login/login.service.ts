import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {}

  async create(createLoginDto: CreateLoginDto): Promise<Login> {
    const login = this.loginRepository.create(createLoginDto);
    return this.loginRepository.save(login);
  }

  async findAll(): Promise<Login[]> {
    return this.loginRepository.find();
  }

  async findOne(id: number): Promise<Login> {
    return this.loginRepository.findOne({ where: { id_login: id } });
  }

  async remove(id: number): Promise<void> {
    await this.loginRepository.delete(id);
  }
}
