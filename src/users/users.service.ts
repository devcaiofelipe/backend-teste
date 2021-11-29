import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
type sortType = 'ASC' | 'DESC';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(page: number, limit: number, sortType: sortType): Promise<User[]> {
    const MAX_USERS_PER_PAGE = 50;
    const MIN_USERS_PER_PAGE = 1;
    const MIN_NUMBER_PAGE = 1;
    if(page < MIN_NUMBER_PAGE) {
      page = 1;
    };
    if(limit > MAX_USERS_PER_PAGE) {
        limit = 50;
    };
    if(limit < MIN_USERS_PER_PAGE) {
        limit = 1;
    };
    const offset = limit * (page - 1);
    return this.usersRepository.find({
      select: ['id', 'fullname', 'cpf'],
      skip: offset,
      take: limit,
      order: { id: sortType }
    });
  };

  async create(payload: CreateUserDto): Promise<User> {
    const { fullname, phone, cpf, address_info } = payload;
    const { postal_code, street, city, state } = address_info;
    const user = {
      fullname,
      phone,
      cpf,
      postal_code,
      street,
      city,
      state
    }
    try {
      const insertResult = await this.usersRepository.insert(user);
      const userId = insertResult.identifiers[0].id;
      const newUser = await this.findOne(userId);
      return newUser;
    } catch(e) {
      return null;
    };
  };

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async findByCPF(cpf: string): Promise<User> {
    const user = await this.usersRepository.findOne({ cpf });
    return user ? user : null;
  };

  async update(userId: number, userData: UpdateUserDto, addressInfo: CreateAddressDto) {
    const data: UpdateUserDto = {};
    if(userData.fullname) {
      data.fullname = userData.fullname;
    };
    if(userData.cpf) {
      data.cpf = userData.cpf;
    };
    if(userData.phone) {
      data.phone = userData.phone;
    };
    if(userData.postal_code) {
      data.postal_code = userData.postal_code;
    };
    data.postal_code = addressInfo.postalCode;
    data.street = addressInfo.street;
    data.city = addressInfo.city;
    data.state = addressInfo.state;
    const result = await this.usersRepository.update({ id: userId }, data);
    const hasBeenUpdated = result.affected > 0;
    if(!hasBeenUpdated) {
      return null;
    }
    const updatedUser = await this.findOne(String(userId));
    return updatedUser;
  };
}