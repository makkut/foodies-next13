import { AccountSchema } from "./account";
import { CategorySchema } from "./category";
import { GoodsSchema } from "./goods";
import { OrderSchema } from "./order";
import { OrderItemSchema } from "./orderItem";
import { PaymantResultSchema } from "./paymentResult";
import { ProductSchema } from "./product";
import { ShippingAddressSchema } from "./shippingAddress";
import { TokenSchema } from "./token";
import { UserSchema } from "./user";

export const schemaTypes = [
  GoodsSchema,
  CategorySchema,
  UserSchema,
  TokenSchema,
  AccountSchema,
  ShippingAddressSchema,
  ProductSchema,
  PaymantResultSchema,
  OrderItemSchema,
  OrderSchema,
];
