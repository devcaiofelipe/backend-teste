import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import MongooseFactory from 'src/infra/factory/mongoose-factory';
import MongooseAddressFactory from 'src/infra/factory/mongoose-address-factory';

const FEATURES = [MongooseAddressFactory.make()];
@Module({
  imports: [MongooseFactory.forFeature(...FEATURES)],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService]
})
export class AddressesModule {}
