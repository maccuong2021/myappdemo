// src/components/token/token.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('api')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post('register-token')
  registerToken(@Body('token') token: string) {
    this.tokenService.addToken(token);
    return { success: true };
  }
}
