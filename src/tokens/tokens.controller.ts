import {
  Controller,
  Get,
  Headers,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokensService } from './tokens.service';
// import { AuthService } from '../auth/auth.service';

@Controller('tokens')
export class TokensController {
  constructor(
    private tokensService: TokensService, // private userService: AuthService,
  ) {}

  @Get('history')
  @UseGuards(AuthGuard('basic'))
  async getAllTokens(@Headers() header) {
    return await this.tokensService.getTotalHistory(header.authorization);
  }
  @Get('historyUSD')
  @UseGuards(AuthGuard('basic'))
  async getAllUsd(@Headers() header) {
    return await this.tokensService.getUsdHistory(header.authorization);
  }

  @Get('todayToken')
  @UseGuards(AuthGuard('basic'))
  async getTodayToken(@Headers() header) {
    return await this.tokensService.getTodayToken(header.authorization);
  }

  @Post('add')
  @UseGuards(AuthGuard('basic'))
  async addToken(@Req() req, @Res() res, @Headers() header) {
    return await this.tokensService.addToken(req, res, header.authorization);
  }
}
