import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Product {
  readonly id: string;
  readonly groceryList?: GroceryList;
  readonly name: string;
  readonly checked: boolean;
  readonly unit: string;
  readonly quantity: number;
  readonly category: string;
  readonly owner?: string;
  constructor(init: ModelInit<Product>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

export declare class GroceryList {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly products?: (Product | null)[];
  readonly owner?: string;
  readonly editors?: (string | null)[];
  constructor(init: ModelInit<GroceryList>);
  static copyOf(source: GroceryList, mutator: (draft: MutableModel<GroceryList>) => MutableModel<GroceryList> | void): GroceryList;
}