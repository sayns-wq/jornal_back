import { IsString } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn({ name: 'email', type: 'varchar' })
  @IsString()
  email: string;

  @IsString()
  @Column({ name: 'passwordHash', type: 'varchar' })
  passwordHash: string;

  @IsString()
  @Column({ name: 'username', type: 'varchar' })
  username: string;

  @IsString()
  @Column({ name: 'role', type: 'varchar' })
  role: string;
}
