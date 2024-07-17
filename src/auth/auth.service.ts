import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { promisify } from 'util';
import * as bcrypt from 'bcryptjs';
const scrypt = promisify(_scrypt);



@Injectable()
export class AuthService {

    constructor(private readonly usuarioService: UsuarioService) { }


    async validateUser(email: string, senha: string) {
        console.log('Email:', email);
        console.log('Senha:', senha);
        
        const user = await this.usuarioService.finfByEmail(email);
        console.log(user);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
    
       
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
    
        return {
            ...user,
            senha: undefined,
        };


    }
    
}

