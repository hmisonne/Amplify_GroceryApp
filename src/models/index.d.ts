import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class ProductConnection {
  readonly items?: Product[];
  readonly nextToken?: string;
  constructor(init: ModelInit<ProductConnection>);
}

export declare class Product {
  readonly id: string;
  readonly groceryList?: GroceryList;
  readonly name: string;
  readonly checked: boolean;
  readonly unit: string;
  readonly quantity: number;
  readonly category: string;
  constructor(init: ModelInit<Product>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

export declare class GroceryList {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly products?: Product[];
  constructor(init: ModelInit<GroceryList>);
  static copyOf(source: GroceryList, mutator: (draft: MutableModel<GroceryList>) => MutableModel<GroceryList> | void): GroceryList;
}

export declare class User {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly userGroceryListID?: string[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}