import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'intern',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'manager',
    },
    {
      id: 3,
      name: 'Carol Lee',
      email: 'carol.lee@example.com',
      role: 'intern',
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@example.com',
      role: 'manager',
    },
    {
      id: 5,
      name: 'Eva Brown',
      email: 'eva.brown@example.com',
      role: 'intern',
    },
  ];

  getAllUsers(
    role?: 'manager' | 'intern',
  ): { id: number; name: string; email: string; role: string }[] {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0)
        throw new NotFoundException('user role not found');
      return rolesArray;
    }
    return this.users;
  }

  getOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  createUser(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, update: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...update,
        };
      }
      return user;
    });
    return this.users.find((user) => user.id === id);
  }
}
