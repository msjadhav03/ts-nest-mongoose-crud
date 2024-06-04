import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { Public } from 'src/decorators/public.decorator';
import { SignInDto } from 'src/user/dto/sign-in.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  login(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  @ApiBearerAuth()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Public()
  @Get('username')
  findUserByUserName(@Param('username') username: string): Promise<any> {
    return this.userService.findUserByUserName(username);
  }
  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
