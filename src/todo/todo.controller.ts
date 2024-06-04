import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { VERSION } from 'src/constants/constants';

@ApiTags('Todo')
@Controller({
  version: VERSION,
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBody({ type: CreateTodoDto })
  @Post('/todo')
  @ApiBearerAuth()
  create(@Body() createTodoDto: CreateTodoDto) {
    console.log(`Incoming request body`, createTodoDto);
    return this.todoService.create(createTodoDto);
  }

  @Get('/todo')
  @ApiBearerAuth()
  findAll() {
    return this.todoService.findAll();
  }

  @Get('/todo/:id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @ApiBody({ type: UpdateTodoDto })
  @Patch('/todo/:id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete('/todo/:id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
