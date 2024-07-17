import { AuthService } from './auth.service';
import { Body,Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Body() body: any) {
        const { email, senha } = body;
        return this.authService.validateUser(email, senha);
    }
}



//     @Post('deslogado')
//     signIn(@Body() body: any) {
//         const { email, senha} = body;
//         return this.authService.validateUser(email, senha)
//     }

