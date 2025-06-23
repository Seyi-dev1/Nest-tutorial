import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get() //get all users
  // getAllUsers(): [] {
  //   return [];
  // }

  @Get() //get users with query parameter
  getAllUsers2(@Query('role') role?: 'intern' | 'manager') {
    return this.usersService.getAllUsers(role);
  }

  @Get(':id') //get /users/:id
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    update: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, update);
  }
}
