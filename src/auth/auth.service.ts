import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scrypt as _scryopt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scryopt)

const users = [];

@Injectable()
export class AuthService {
    async singUp(email: string, senha: string) {
        
        const existUser = users.find(user => user.email === email)
        if(existUser) {
            return new BadRequestException('Email já cadastrado')}
            
        const  salt = randomBytes(8).toString('hex');
        const hash = await scrypt(senha,salt,32) as Buffer;
        const salEHash =`${salt}.${hash.toString('hex')}`; 
    
        const user = {
            email,
            senha: salEHash
        }
        
        users.push(user)

        console.log('Logado ', user);

        const {senha:  _, ...result } = user;
        return result;
    };
    async singIn(email: string, senha: string) {
        const user = users.find(user => user.email === email)
        if(!user){
            return new UnauthorizedException('Credenciais Invalidas');
        }
        
        const [salt,storeHasg] = user.senha.split('.')
        const hash = (await scrypt(senha,salt,32)) as Buffer;

        if(storeHasg != hash.toString('hex')) {
            return new UnauthorizedException('Credenciais Invalidas');
        }

        console.log('deslogado ', user);
        const {senha:  _, ...result } = user;
        return result;
    }

}
