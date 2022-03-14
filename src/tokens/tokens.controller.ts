import { Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @Get('history')
  @UseGuards(AuthGuard('basic'))
  async getAllTokens(@Headers() header) {
    return await this.tokensService.getTokenHistory(header.authorization);
  }
  @Get('historyUSD')
  @UseGuards(AuthGuard('basic'))
  async getAllUsd(@Headers() header) {
    return await this.tokensService.getUsdHistory(header.authorization);
  }

  @Get('todayToken')
  @UseGuards(AuthGuard('basic'))
  async getTodayToken(@Headers() header) {
    return await this.tokensService.getUsdHistory(header.authorization);
  }

  @Post('add')
  @UseGuards(AuthGuard('basic'))
  async addToken(@Req() req, @Headers() header) {
    return await this.tokensService.addToken(req, header.authorization);
  }
}
