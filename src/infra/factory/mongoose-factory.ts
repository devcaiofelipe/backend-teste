import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import MongooseFeature from "../interfaces/mongoose-feature";

export default class MongooseFactory {
  static forFeature(...params: MongooseFeature[]): DynamicModule {
    return MongooseModule.forFeature(params);
  };
};