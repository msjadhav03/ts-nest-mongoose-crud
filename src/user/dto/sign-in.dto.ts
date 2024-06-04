import { IsEmail, IsNotEmpty } from "class-validator"
export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
