import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





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
  readonly users?: UserGroceryListJoin[];
  constructor(init: ModelInit<GroceryList>);
  static copyOf(source: GroceryList, mutator: (draft: MutableModel<GroceryList>) => MutableModel<GroceryList> | void): GroceryList;
}

export declare class UserGroceryListJoin {
  readonly id: string;
  readonly user: User;
  readonly groceryList: GroceryList;
  constructor(init: ModelInit<UserGroceryListJoin>);
  static copyOf(source: UserGroceryListJoin, mutator: (draft: MutableModel<UserGroceryListJoin>) => MutableModel<UserGroceryListJoin> | void): UserGroceryListJoin;
}

export declare class User {
  readonly id: string;
  readonly sub: string;
  readonly groceryLists?: UserGroceryListJoin[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}