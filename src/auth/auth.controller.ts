import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
   async login(@Body() body) {
        const { email, senha } = body;
        let usuario = await this.authService.validateUser(email, senha)
        usuario = JSON.stringify(usuario)
        return this.authService.login(usuario);
        

    }
}


