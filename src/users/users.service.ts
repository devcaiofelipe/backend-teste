import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
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
}