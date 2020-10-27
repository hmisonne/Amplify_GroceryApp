import { DataStore } from "@aws-amplify/datastore";
import { GroceryList, Product } from "../src/models";

export class BackendInterface {
  constructor(dataStore) {
      this._dataStore = dataStore
  }
  
 async fetchAllGroceryLists() {
    try {
      const allGroceryLists = await DataStore.query(GroceryList);
      console.log("grocery lists retrieved successfully!");
      return allGroceryLists;
    } catch (error) {
      console.log("Error retrieving grocery lists", error);
    }
  }
  
   async fetchUserGroceryLists() {
      try {
          const result = await DataStore.query(GroceryList)
          console.log("grocery lists retrieved successfully!");
          return result
      } catch (error) {
        console.log("Error retrieving grocery lists", error);
      }
    }
  
   async addGroceryListToUser(groceryListID) {
      try {
// TEST ADD 
        const original = await DataStore.query(GroceryList, groceryListID)
        const updatedGroceryList =  await DataStore.save(
          GroceryList.copyOf(original, (updated) => {
            updated.editors = original.editors.push('jeanne')
          }))
        console.log("Grocery list added to user successfully!", updatedGroceryList);
        return updatedGroceryList
      } catch (error) {
        console.log("Error adding grocery list to user", error);
      }
    }
  
  
   async createNewGroceryList (groceryList) {
      try {
        const groceryListSaved = await DataStore.save(
        new GroceryList({
          name: groceryList.name,
          description: groceryList.description,
        })
      );
      
      console.log("List saved successfully!");
      return groceryListSaved
    } catch (err) {
      console.log("error creating list:", err);
    }
  }
 async createNewProduct(product, groceryListID) {
    try {
      // Retrieve List object
      const currentList = await DataStore.query(GroceryList, groceryListID);
      // Add reference
      product.groceryList = currentList;
      const productSaved = await DataStore.save(new Product(product));
      console.log("Product saved successfully!", productSaved);
      return productSaved
    } catch (err) {
      console.log("error creating food:", err);
    }
  }
  
  
 async updateProductDetails(product) {
    try {
      const original = await DataStore.query(Product, product.id);
      const updatedProduct =  await DataStore.save(
        Product.copyOf(original, (updated) => {
          updated.checked = product.checked
          updated.name = product.name
          updated.unit = product.unit
          updated.quantity = product.quantity
        }))
        console.log("Product updated successfully!", updatedProduct);
        return updatedProduct
     } catch (err) {
    console.log("error creating food:", err);
    }
  }
  
 async  fetchProductsByGroceryList(groceryListID) {
    try {
      const data = (await DataStore.query(Product)).filter(
        (c) => c.groceryList.id === groceryListID
      );
      console.log("products retrieved successfully!");
      return data
    } catch (error) {
      console.log("Error retrieving products", error);
    }
  }
  
 async removeProduct(id) {
    try {
      const todelete = await DataStore.query(Product, id);
      DataStore.delete(todelete);
    } catch (err) {
      console.log("error deleting product", err);
    }
  }
}

export const API = new BackendInterface(DataStore)