import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(['intern', 'manager', 'staff'], {
    message: 'Valid role required',
  })
  role: 'intern' | 'manager' | 'staff';
}
