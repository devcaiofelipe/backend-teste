import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressesModule } from './addresses/addresses.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AddressesModule, MongooseModule.forRoot('mongodb://root:pass12345@localhost:27017')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
