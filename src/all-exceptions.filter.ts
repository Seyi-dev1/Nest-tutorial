import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type MyResponseObj = {
  statusCode: number;
  timeStamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const MyResponseObj: MyResponseObj = {
      statusCode: 500,
      timeStamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      MyResponseObj.statusCode = exception.getStatus();
      MyResponseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      MyResponseObj.statusCode = 422;
      MyResponseObj.response = exception.message.replaceAll(/\n/g, '');
    } else {
      MyResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      MyResponseObj.response = 'Internal Server Error';
    }
    response.status(MyResponseObj.statusCode).json(MyResponseObj);
    super.catch(exception, host);
  }
}
