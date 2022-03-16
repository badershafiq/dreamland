import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { user } from 'src/auth/auth.entity';

@Entity()
export class token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  token: number;

  @Column('float')
  usd: number;

  @OneToOne(() => user, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: user;
}
