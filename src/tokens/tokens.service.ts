import { Injectable, Req, Inject, HttpStatus, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { token } from '../tokens/token.entity';
import { AuthService } from '../auth/auth.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(token)
    private tokenRepository: Repository<token>,
  ) {}

  @Inject(AuthService)
  private readonly userService: AuthService;

  async getTotalHistory(userToken): Promise<any> {
    try {
      const userDetail = Buffer.from(
        userToken.split(' ')[1].split(':')[0],
        'base64',
      )
        .toString()
        .split(':');
      const userId = await this.userService.getUser(userDetail[0]);
      if (!userId) {
        return 'There is no User with the given Email';
      }
      const history = await this.tokenRepository.find({
        where: { user: userId },
      });
      console.log(history[0].token + history[0].usd);
      return (
        'The total Tokens till today were: ' +
        history[0].token +
        ' and the Amount already collected is: ' +
        history[0].usd
      );
    } catch (error) {
      return error;
    }
  }

  async getTodayToken(userToken): Promise<any> {
    const userDetail = Buffer.from(
      userToken.split(' ')[1].split(':')[0],
      'base64',
    )
      .toString()
      .split(':');
    const userId = await this.userService.getUser(userDetail[0]);
    if (!userId) {
      return 'There is no User with the given Email';
    }
    const tokens = await this.tokenRepository.find({
      where: { user: userId },
    });
    console.log(tokens[0].token);
    return tokens[0].token;
  }

  async getUsdHistory(userToken): Promise<any> {
    const userDetail = Buffer.from(
      userToken.split(' ')[1].split(':')[0],
      'base64',
    )
      .toString()
      .split(':');
    const userId = await this.userService.getUser(userDetail[0]);
    if (!userId) {
      return 'There is no User with the given Email';
    }
    const usd = await this.tokenRepository.find({
      where: { user: userId },
    });
    return usd[0].usd;
  }

  async addToken(@Req() req, @Res() res, userToken): Promise<any> {
    try {
      if (req.body.token > 5) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .send('You can only win 5 tokens per day!');
      }
      const userDetail = Buffer.from(
        userToken.split(' ')[1].split(':')[0],
        'base64',
      )
        .toString()
        .split(':');
      const userId = await this.userService.getUser(userDetail[0]);
      if (!userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send('There is no User with the given Email');
      }
      const userTokens = await this.getTodayToken(userToken);
      const tokenCount = userTokens + req.body.token;
      if (tokenCount >= 5) {
        this.tokenRepository.update(userId, { token: 5 });
        return res.send('Limit is 5 tokens, so the given are added uptil 5');
      } else if (tokenCount < 5) {
        this.tokenRepository.update(userId, { token: 5 });
        return res.send('Token Added to your Profile. Keep Playing!');
      }
    } catch (error) {
      return error;
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const tokensArray = await this.tokenRepository.find({});
    tokensArray.forEach((element) => {
      element.usd = element.token * 0.15;
    });
  }
}
