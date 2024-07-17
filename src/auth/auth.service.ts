import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

const users = []; // Esta abordagem não é recomendada para produção

@Injectable()
export class AuthService {
    async signUp(email: string, senha: string) {
        const existUser = users.find(user => user.email === email);
        if (existUser) {
            throw new BadRequestException('Email já cadastrado');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = await scrypt(senha, salt, 10) as Buffer;
        const saltAndHash = `${salt}.${hash.toString('hex')}`;

        const user = {
            email,
            senha: saltAndHash
        };

        users.push(user); // Armazenamento em memória para exemplo

        const { senha: _, ...result } = user;
        return result;
    }

    async signIn(email: string, senha: string) {
        const user = users.find(user => user.email === email);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const [salt, storedHash] = user.senha.split('.');
        const hash = (await scrypt(senha, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const { senha: _, ...result } = user;
        return result;
    }
}