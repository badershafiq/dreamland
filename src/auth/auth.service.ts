import { Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(user)
    private userRepository: Repository<user>,
  ) {}

  async userSignUp(@Req() req, @Res() res): Promise<any> {
    try {
      await this.userRepository.insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return 'User Successfully Created';
    } catch (err) {
      return res.status(409).send('User already Exists');
    }
  }

  async getUser(username): Promise<any> {
    const user = await this.userRepository.find({
      where: { email: username },
    });
    if (user.length != 0) {
      return user[0].id;
    }
    return false;
  }
}
