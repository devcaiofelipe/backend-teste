import { Address, AddressSchema } from "src/addresses/entities/address.entity";

export default class MongooseAddressFactory {
  static make() {
    return { name: Address.name, schema: AddressSchema };
  };
};