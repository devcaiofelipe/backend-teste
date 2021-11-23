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

  static isValidCPF(cpf: string): boolean {
    if (cpf == null) {
        return false;
    }
    if (cpf.length != 11) {
        return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
        return false;
    }
    else {
        return true;
    }
  }
  static isDigit(digit: string): boolean {
    return /\d+/.test(digit);
  };
};
