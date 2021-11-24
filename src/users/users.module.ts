import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AddressesService } from 'src/addresses/addresses.service';
import MongooseFactory from 'src/infra/factory/mongoose-factory';
import MongooseAddressFactory from 'src/infra/factory/mongoose-address-factory';

const FEATURES = [MongooseAddressFactory.make()];
@Module({
  imports: [TypeOrmModule.forFeature([User]), MongooseFactory.forFeature(...FEATURES)],
  providers: [UsersService, AddressesService],
  controllers: [UsersController],
})
export class UsersModule {}