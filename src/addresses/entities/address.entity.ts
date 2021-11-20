import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop()
  postalCode: string;

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);