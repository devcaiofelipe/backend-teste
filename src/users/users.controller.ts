import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async findOne(@Res() res: Response) {
    const result = await this.usersService.findAll();
    return res.status(HttpStatus.ACCEPTED).json(result);
  }

  @Post('create')
  async create(@Body() payload: CreateUserDto, @Res() res: Response) {
    const newUser = await this.usersService.create(payload);
    return res.status(HttpStatus.CREATED).json(newUser);
  }
}
