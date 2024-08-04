import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { UserPayload } from './interfaces/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './interfaces/UserToken';

@Injectable()
export class AuthService {
    constructor(private readonly usuarioService: UsuarioService, private readonly jwtService: JwtService ) {}
    
    login(usuario: any): UserToken {
        usuario = JSON.parse(usuario)
        const payload: UserPayload ={
            sub: usuario.id,
            email: usuario.email,
        };
        const jwtToken = this.jwtService.sign(payload); 
        
        return {
            acessToken: jwtToken
        };
    }

    async validateUser(email: string, senha: string): Promise<any> {

        let user = await this.usuarioService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        user = {
            ...user,
            senha: undefined,
        };

        return user;
    }
}
