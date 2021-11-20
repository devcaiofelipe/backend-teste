import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address, AddressDocument } from './entities/address.entity';
import axios from 'axios';
import { Utils } from '../utils/Utils';

type AddressBR = {
  cep: string;
  logradouro?: string | null;
  complemento?: string | null;
  cidade?: string | null;
  estado?: string | null;
  bairro?:string | null;
  localidade?:string | null;
  uf?:string | null;
  ibge?:string | null;
  gia?:string | null;
  ddd?:string | null;
  siafi?:string | null;
};
type AddressType = { postalCode: string, street: string | null, city: string | null, state:string | null } | null;

@Injectable()
export class AddressesService {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {}

  async findOne(postalCode: string): Promise<AddressType> {
    const hasAddressCache = await this.addressModel.findOne({ postalCode }).exec();
    if(!hasAddressCache) {
      const address = await this.findInViaCep(postalCode);
      if(address) {
        const cachedAddress = this.createCache(address);
        return cachedAddress;
      };
      return null;
    };
    return hasAddressCache;
  }
  
  async findInViaCep(postalCode: string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${postalCode}/json/`);
      const responseHasError = response.data.erro;
      if(responseHasError) {
        return null;
      };
      const newAddress = this.handleAddress(response.data);
      return newAddress;
    } catch (e) {
      return null;
    };
  };

  handleAddress(address: AddressBR): CreateAddressDto {
    const normalizedCep = Utils.normalizeCep(address.cep);
    return {
      postalCode: normalizedCep,
      street: address.logradouro ? address.logradouro : null,
      city: address.cidade ? address.cidade : address.bairro ? address.bairro : null,
      state: address.uf ? address.uf : null
    };
  };

  createCache(addressDTO: CreateAddressDto) {
    const address = new this.addressModel(addressDTO);
    return address.save();
  };
}
