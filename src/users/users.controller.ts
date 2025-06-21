import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

interface User {
  name: string;
  id: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   @Get() //get all users
  //   getAllUsers(): [] {
  //     return [];
  //   }

  @Get() //get all users
  getAllUsers2(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return 'ADMIN';
  }

  @Get(':id') //get /users/:id
  getOne(@Param('id') id: string): User {
    return {
      name: 'Seyi',
      id: id,
    };
  }

  @Post()
  createUser(@Body() user: {}) {
    return user;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() update: {}) {
    return { id, ...update };
  }
}
