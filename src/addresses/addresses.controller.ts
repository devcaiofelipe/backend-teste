import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AddressesService } from './addresses.service';
import { Utils } from '../utils/Utils';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get(':postalCode/detail')
  async findOne(@Param('postalCode') postalCode: string, @Res() res: Response) {
    const normalizedCep = Utils.normalizeCep(postalCode);
    if(normalizedCep.length !== 8) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: "CEP precisa ser uma sequencia de 8 dígitos." });
    };
    const addressFound = await this.addressesService.findOne(normalizedCep);
    if(!addressFound) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: "Endereço não encontrado." });
    };
    return res.status(HttpStatus.OK).json(addressFound);
  }
}
