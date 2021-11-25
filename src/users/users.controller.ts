import { Controller, Get, Post, Delete, Res, HttpStatus, Body, Param, Query } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Utils } from 'src/utils/Utils';
import { AddressesService, AddressType } from 'src/addresses/addresses.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly addressesService: AddressesService) {};

  @Get('all')
  async findAll(@Query() queryParams, @Res() res: Response) {
    let { page, users, order } = queryParams;
    const pageWasNotSent = typeof page === 'undefined';
    const usersWasNotSent = typeof users === 'undefined';
    const orderWasNotSent = typeof order === 'undefined';
    if(pageWasNotSent) {
      page = 1;
    };
    if(usersWasNotSent) {
      users = 10;
    };
    if(orderWasNotSent) {
      order = 'DESC'
    };
    const ordersType = ['ASC', 'DESC'];
    if(!ordersType.includes(order.toUpperCase())) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Order precisa ser ASC ou DESC' })
    };
    if(!Utils.isDigit(page) || !Utils.isDigit(users)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Os parametros de consulta precisam ser numérico' });
    };
    const pageNumber = parseInt(page);
    const usersNumber = parseInt(users);
    const result = await this.usersService.findAll(pageNumber, usersNumber, order.toUpperCase());
    return res.status(HttpStatus.ACCEPTED).json(result);
  };

  @Post('create')
  async create(@Body() payload: CreateUserDto, @Res() res: Response) {
    const userIsInvalid = Utils.validateUser(payload);
    if(userIsInvalid) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Dados do usuário estão inválidos.' });
    };
    const user = Utils.handleUser(payload);
    if(!Utils.isValidCPF(user.cpf)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'CPF inválido.' })
    };
    const userAlreadyExists = await this.usersService.findByCPF(user.cpf);
    if(userAlreadyExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Usuário ja cadastrado.'})
    };
    const newUser = await this.usersService.create(user);
    return res.status(HttpStatus.CREATED).json(newUser);
  };

  @Get(':cpf/find-by-cpf')
  async findOneByCPF(@Param() params, @Res() res: Response) {
    const { cpf } = params;
    const normalizedCPF = Utils.normalizeOnlyNumbers(cpf);
    if(!Utils.isValidCPF(normalizedCPF)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'CPF inválido.' })
    };
    const userFound = await this.usersService.findByCPF(normalizedCPF);
    if(!userFound) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'Nenhum usuário encontrado com estes dados.' })
    };
    return res.status(HttpStatus.ACCEPTED).json(userFound);
  };

  @Delete(':id/delete')
  async delete(@Param() params, @Res() res: Response) {
    const { id } = params;
    const integer = parseInt(id);
    const result = await this.usersService.remove(integer);
    const userDeleted = result.affected > 0;
    if(!userDeleted) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'Nenhum usuário deletado' });
    };
    return res.status(HttpStatus.ACCEPTED).json({ message: 'Usuário deletado com sucesso.' });
  };

  @Post(':id/update')
  async update(@Param() params, @Body() payload: UpdateUserDto, @Res() res: Response) {
    const { id } = params;
    if(!Utils.isDigit(id) || parseInt(id) < 1) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Parametro ID precisa ser numérico.' });
    };
    if(payload.phone && Utils.normalizeOnlyNumbers(payload.phone).length !== 11) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Telefone precisa ter 11 caracteres.'});
    };
    if(payload.cpf && Utils.normalizeOnlyNumbers(payload.cpf).length !== 11) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'CPF precisa ser válido e ter 11 caracteres.'});
    };
    if(payload.postal_code && Utils.normalizeOnlyNumbers(payload.postal_code).length !== 8) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'CEP precisa ter 8 caracteres.'});
    };
    let addressInfo: AddressType;
    if(payload.postal_code) {
      addressInfo = await this.addressesService.findOne(payload.postal_code);
    };
    if(!addressInfo) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Os dados do endereço não foram encontrado.' });
    };
    const result = await this.usersService.update(id, payload, addressInfo);
    return res.status(HttpStatus.CREATED).json(result);
  };
};
