import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update.user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userData = new this.userModel(createUserDto);
    return await userData.save();
  }

  async findAll(): Promise<User[]> {
    const result = await this.userModel.find({});
    return result;
  }

  async findOne(id: string): Promise<User> {
    const result = await this.userModel.findOne({ _id: id });
    return result;
  }

  async update(id, updateUserDto: UpdateUserDto): Promise<any> {
    const result = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
    );
    return result;
  }
  async remove(id: string): Promise<any> {
    const result = await this.userModel.deleteOne({ _id: id });
    return result;
  }

  async findUserByUserName(username: string) {
    const result = await this.userModel.find({ username });
    return result;
  }

  async signIn(signInDto: SignInDto) {
    const result: any = await this.findUserByUserName(signInDto.username);

    if (result[0].password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: result._id, username: result.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
