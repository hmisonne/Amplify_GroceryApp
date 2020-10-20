// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, GroceryList, UserGroceryListJoin, User } = initSchema(schema);

export {
  Product,
  GroceryList,
  UserGroceryListJoin,
  User
};