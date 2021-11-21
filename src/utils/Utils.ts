import { CreateUserDto } from "src/users/dto/create-user.dto";

export class Utils {
  static normalizeOnlyNumbers(input: string): string {
    return input.replace(/[^0-9]/g, '');
  };

  static validateUser(payload: CreateUserDto): boolean {
    if(!payload.address_info) return true;
    if(typeof payload.fullname !== 'string') return true;
    if(typeof payload.phone !== 'string' || this.normalizeOnlyNumbers(payload.phone).length !== 11) return true;
    if(typeof payload.cpf !== 'string' || this.normalizeOnlyNumbers(payload.cpf).length !== 11) return true;
    if(typeof payload.address_info.postal_code !== 'string' || this.normalizeOnlyNumbers(payload.address_info.postal_code).length !== 8) return true;
    if(typeof payload.address_info.street !== 'string') return true;
    if(typeof payload.address_info.city !== 'string') return true;
    if(typeof payload.address_info.state !== 'string' || payload.address_info.state.length !== 2) return true;
    return false;
  };

  static handleUser(payload: CreateUserDto): CreateUserDto {
    payload.cpf = this.normalizeOnlyNumbers(payload.cpf);
    payload.phone = this.normalizeOnlyNumbers(payload.phone);
    payload.address_info.postal_code = this.normalizeOnlyNumbers(payload.address_info.postal_code);
    return payload
  };
};
