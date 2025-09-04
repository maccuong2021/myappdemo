import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  private tokens: string[] = [];

  addToken(token: string) {
    if (!this.tokens.includes(token)) {
      this.tokens.push(token);
    }
  }

  getTokens(): string[] {
    return this.tokens;
  }
}
