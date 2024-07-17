import { AuthService } from './../auth/auth.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './entities/login.entity';
import { randomBytes, scrypt as _scryopt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scryopt)

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    private readonly authService: AuthService,
  ) { }

  async create(createLoginDto: CreateLoginDto): Promise<Login> {
    const { email, senha } = createLoginDto;
  
    // Verifica se o email já existe
    const existingLogin = await this.loginRepository.findOne({ where: { email } });
    if (existingLogin) {
      throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);
    }
  
    const  salt = randomBytes(8).toString('hex');
    const hash = await scrypt(senha,salt,10) as Buffer;
    const salEHash =`${salt}.${hash.toString('hex')}`; 
    const user = {
      ...createLoginDto,
      senha: salEHash,
    };
  
    const login = this.loginRepository.create(user);
    return this.loginRepository.save(login); // Este deve retornar um único Login
  }
  

  async findAll(): Promise<Login[]> {
    return this.loginRepository.find();
  }

  async finfByEmail(email:string) {
    return this.loginRepository.findOne({
      where: {email}
    })
  };

  async findOne(id: number): Promise<Login> {
    return this.loginRepository.findOne({ where: { id_login: id } });
  }

  async remove(id: number): Promise<void> {
    await this.loginRepository.delete(id);
  }
}
