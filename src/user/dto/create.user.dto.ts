import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'username of the user',
    example: 'm.jadhav@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'password of the user',
    example: 'Hello2@3@!',
  })
  @IsNotEmpty()
  password: string;
}
