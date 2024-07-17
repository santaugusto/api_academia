import { config } from 'dotenv';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'; // Corrigido aqui
import { ConfigService } from '@nestjs/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            secretOrKey: config.getOrThrow('JWT_SECRET'), // Corrigido para 'JWT_SECRET'
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        // Implementação da validação
    }
}
