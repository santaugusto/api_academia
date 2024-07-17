import { config } from 'dotenv';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtracJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config:ConfigService){
        super({
            secretOrKey: config.getOrThrow('JWT_SCRET'),
            jwtFromRequest: ExtracJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        })
    };

    async validate(payload: any) {
    
    }
};