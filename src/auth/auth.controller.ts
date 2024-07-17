import { AuthService } from './auth.service';
import { Body,Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    
    @Post('autenticar')
    signUp(@Body() body: any) {
        const { email, senha} = body;
        return this.authService.signUp(email, senha)
    }
    @Post('deslogado')
    signIn(@Body() body: any) {
        const { email, senha} = body;
        return this.authService.signIn(email, senha)
    }
}
