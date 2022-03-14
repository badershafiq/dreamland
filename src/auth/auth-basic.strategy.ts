import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { USERS } from 'src/mocks/users.mock';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    const user = USERS.filter(
      (user) => user.email == username && user.password == password,
    );
    if (user.length > 0) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
