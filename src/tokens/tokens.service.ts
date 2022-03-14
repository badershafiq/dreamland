import { Injectable, Req } from '@nestjs/common';
import { TOKENS } from 'src/mocks/tokens.mock';
import { USERS } from 'src/mocks/users.mock';
import { atob } from 'buffer';
import console from 'console';
import { Connection, getConnection } from 'typeorm';

@Injectable()
export class TokensService {
  tokens = TOKENS;
  users = USERS;

  async getTokenHistory(userToken): Promise<any> {
    try {
      const userDetail = atob(userToken.split(' ')[1]).split(':');
      const user = USERS.filter(
        (user) => user.email == userDetail[0] && user.password == userDetail[1],
      );
      const userTokens = TOKENS.filter(
        (value) => value.userId == user[0].id && value.date == 4,
      );
      return userTokens;
    } catch (error) {
      console.log(error);
    }
  }

  async getTodayToken(userToken): Promise<any> {
    try {
      const userDetail = atob(userToken.split(' ')[1]).split(':');
      const user = USERS.filter(
        (user) => user.email == userDetail[0] && user.password == userDetail[1],
      );
      const userTokens = TOKENS.filter(
        (value) => value.userId == user[0].id && value.date == 4,
      );
      let tokenCount = 0;
      for (let i = 0; i < userTokens.length; i++)
        tokenCount = tokenCount + userTokens[i].usd;
      let userTotalUsd = 0;
      for (let i = 0; i < userTokens.length; i++)
        userTotalUsd = userTotalUsd + userTokens[i].usd;
      return `Today won Token ${tokenCount} and total USD ${userTotalUsd}`;
    } catch (error) {
      console.log(error);
    }
  }

  async getUsdHistory(userToken): Promise<any> {
    try {
      const userDetail = atob(userToken.split(' ')[1]).split(':');
      const user = USERS.filter(
        (user) => user.email == userDetail[0] && user.password == userDetail[1],
      );
      const userTokens = TOKENS.filter((value) => value.userId == user[0].id);
      let userTotalUsd = 0;
      for (let i = 0; i < userTokens.length; i++)
        userTotalUsd = userTotalUsd + userTokens[i].usd;
      return userTotalUsd;
    } catch (error) {
      console.log(error);
    }
  }
  async addToken(@Req() req, userToken): Promise<any> {
    try {
      const userDetail = atob(userToken.split(' ')[1]).split(':');
      const user = USERS.filter(
        (user) => user.email == userDetail[0] && user.password == userDetail[1],
      );

      const userTokens = TOKENS.filter(
        (value) => value.date == req.body.date && value.userId == user[0].id,
      );

      let tokenCount = 0;
      for (let i = 0; i < userTokens.length; i++)
        tokenCount = tokenCount + userTokens[i].usd;
      tokenCount = req.body.token + tokenCount;
      if (tokenCount < 5) {
        this.tokens.push({
          id: userTokens.length + 1,
          token: req.body.token,
          usd: req.body.usd,
          userId: user[0].id,
          date: req.body.date,
        });
        return 'Token successfully Added' + userTokens.length;
      } else {
        return 'Max number of token is five.' + userTokens.length;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
