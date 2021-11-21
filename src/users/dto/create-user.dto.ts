export type AddressInfo = {
  postal_code: string;
  street: string;
  city: string;
  state: string;
}

export class CreateUserDto {
  id?: number;
  fullname: string;
  phone: string;
  cpf: string;
  address_info: AddressInfo;
}