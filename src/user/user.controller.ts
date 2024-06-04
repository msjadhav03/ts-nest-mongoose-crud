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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { VERSION } from 'src/constants/constants';

@Controller({
  version: VERSION,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('Auth')
  @ApiBody({ type: SignInDto })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  login(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @ApiTags('Auth')
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiTags('User')
  @Get('/user')
  @ApiBearerAuth()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiTags('User')
  @ApiBody({ type: CreateUserDto })
  @Public()
  @Post('/user')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @ApiTags('User')
  @Public()
  @Get('/user/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiTags('User')
  @Public()
  @Get('/user/username')
  findUserByUserName(@Param('username') username: string): Promise<any> {
    return this.userService.findUserByUserName(username);
  }

  @ApiTags('User')
  @ApiBody({ type: UpdateUserDto })
  @Public()
  @Patch('/user/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiTags('User')
  @Public()
  @Delete('/user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
