// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, GroceryList, User, ProductConnection } = initSchema(schema);

export {
  Product,
  GroceryList,
  User,
  ProductConnection
};