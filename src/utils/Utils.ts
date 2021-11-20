export class Utils {
  static normalizeCep(cep: string): string {
    return cep.replace(/[^0-9]+/, '');
  };
};