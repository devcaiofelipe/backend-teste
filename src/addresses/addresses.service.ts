import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address, AddressDocument } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {}

  create(createAddressDto: CreateAddressDto) {
    const address = new this.addressModel(createAddressDto);
    return address.save();
  }

  findOne(postalCode: string) {
    return this.addressModel.findOne({ postalCode });
  }
}
