import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { user } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(user)
    private userRepository: Repository<user>,
  ) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    try {
      const user = await this.userRepository.find({
        email: username,
        password: password,
      });
      if (user.length) {
        return true;
      }
    } catch (err) {
      throw new UnauthorizedException();
    }
  };
}
