import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of the todo item',
    example: 'Doodling',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Status of the todo item',
    example: 'started',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
