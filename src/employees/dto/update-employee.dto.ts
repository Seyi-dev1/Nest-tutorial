import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

export class updateEmployeeDto extends PartialType(CreateEmployeeDto) {}
