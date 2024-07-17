import { AuthService } from '../auth/auth.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity'; 
import { randomBytes, scrypt as _scryopt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcryptjs';

const scrypt = promisify(_scryopt)

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { email, senha } = createUsuarioDto;
  
    // Verifica se o email já existe
    const existingUsuario= await this.usuarioRepository.findOne({ where: { email } });
    if (existingUsuario) {
      throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);
    }
  
    const hashedSenha = await bcrypt.hash(senha, 10);

    const user = {
      ...createUsuarioDto,
      senha: hashedSenha,
    };
  
    const usuario= this.usuarioRepository.create(user);
    return this.usuarioRepository.save(usuario); 
  }
  

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async finfByEmail(email:string) {
    return this.usuarioRepository.findOne({
      where: {email}
    })
  };

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id_usuario: id } });
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
