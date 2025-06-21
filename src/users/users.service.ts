import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getGreeting(): string {
    return 'Hello there partner';
  }
}
