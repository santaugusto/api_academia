import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' }); 
    }

    async validate(request:Request, email: string, senha: string) {
        
        
        const user = await this.authService.validateUser(email, senha);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        return user;
    }
}
