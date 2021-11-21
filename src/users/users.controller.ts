import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
@Controller('users')
export class  UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async findOne(id: string, @Res() res: Response) {
    const result = await this.usersService.findAll();
    return res.status(HttpStatus.ACCEPTED).json(result);
  }
}
