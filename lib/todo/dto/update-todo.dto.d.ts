import { CreateTodoDto } from './create-todo.dto';
declare const UpdateTodoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTodoDto>>;
export declare class UpdateTodoDto extends UpdateTodoDto_base {
    title: string;
    status: string;
}
export {};
