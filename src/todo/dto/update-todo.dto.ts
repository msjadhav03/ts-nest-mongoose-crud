import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdateTodoDto {
  @ApiProperty({
    description: 'Title of the todo item',
    example: 'Doodling',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Title of the todo item',
    example: 'pending',
  })
  @IsString()
  status: string;
}
