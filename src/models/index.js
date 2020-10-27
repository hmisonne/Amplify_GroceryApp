// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, GroceryList, User } = initSchema(schema);

export {
  Product,
  GroceryList,
  User
};