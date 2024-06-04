import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { SignInDto } from 'src/user/dto/sign-in.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(signInDto: SignInDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    findAll(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(id: string): Promise<User>;
    findUserByUserName(username: string): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<any>;
}
