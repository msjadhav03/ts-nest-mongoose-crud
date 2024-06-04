import { IsString, IsNotEmpty } from 'class-validator';
export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
