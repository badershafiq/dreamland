import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  token: number;

  @Column('date')
  date: Date;

  @Column('float')
  usd: number;
}
