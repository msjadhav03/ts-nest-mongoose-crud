import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';
import { Model } from 'mongoose';
@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const data = new this.todoModel(createTodoDto);
    return data.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    console.log(id);
    return this.todoModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateTodoDto },
    );
  }

  async remove(id: string): Promise<Todo> {
    const data = await this.todoModel.findById(id);
    await this.todoModel.deleteOne({ _id: id });
    return data;
  }
}
