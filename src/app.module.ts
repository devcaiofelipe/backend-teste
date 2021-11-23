import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressesModule } from './addresses/addresses.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    AddressesModule, UsersModule,
    MongooseModule.forRoot('mongodb://root:pass12345@mongodb:27017'),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-development',
      port: 3306,
      username: 'root',
      password: 'pass12345',
      database: 'development',
      entities: [User],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
