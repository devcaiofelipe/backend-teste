import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  cpf: string;

  @Column()
  postal_code: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;
}