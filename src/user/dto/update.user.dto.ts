import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  username: string;

  password: string;
}
