import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user-dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(Number(id), updateUserDto);
  }

  @Get(':id')
  findUserAndPostByUserId(@Param('id') id: string) : Promise<User | null> {
    return this.userService.findUserAndPostByUserId(Number(id));
  } 

  @Get(':name')
  findByUserName(@Param('name') name: string) : Promise<User | null> {
    return this.userService.findByUserName(name);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(Number(id));
  }

}