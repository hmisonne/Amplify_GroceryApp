// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, GroceryList } = initSchema(schema);

export {
  Product,
  GroceryList
};