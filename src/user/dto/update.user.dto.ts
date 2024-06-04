import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'username of the user',
    example: 'm.jadhav@gmail.com',
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    description: 'password of the user',
    example: 'Hello!231@',
  })
  @IsString()
  password: string;
}
