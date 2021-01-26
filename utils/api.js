import { User, GroceryList, Product } from "../src/models";
import { DataStore, Auth } from 'aws-amplify'

export class BackendInterface {
  constructor(dataStore) {
      this._dataStore = dataStore
  }
 async identifyUser() {
    try {
      const userInfo = await Auth.currentUserInfo();
      const result = await this._dataStore.query(User, (c) =>
        c.sub("eq", userInfo.attributes.sub,)
      );
      // if new user created by error, use the oldest reference
      result.sort((a,b) => a._lastChangedAt - b._lastChangedAt)
      let currentUser = result[0]
      if (currentUser === undefined){
        currentUser = await this.createUser(userInfo)
      }
      console.log("User info retrieved successfully!");
      return currentUser
    } catch (error) {
      console.log("Error retrieving user info", error);
    }
  }
  
  async createUser(userInfo) {
    try {
      const userDetails = {
        sub: userInfo.attributes.sub,
        username: userInfo.username,
      };
      const newUser = await this._dataStore.save(new User(userDetails));
      console.log("new User created successfully");
      return newUser;
    } catch (err) {
      console.log("error creating new User", err);
    }
  }
  
 async removeGroceryListFromUser(id) {
      try {
        const user = await this._dataStore.query(User)
        const groceryList = await this._dataStore.query(GroceryList, id)
        await this._dataStore.save(
          GroceryList.copyOf(groceryList, (updated) => {
            updated.shoppers = updated.shoppers && updated.shoppers.filter(username => username !== user[0].username)
          }))

        await this._dataStore.save(
          User.copyOf(user[0], (updated) => {
            updated.groceryLists = updated.groceryLists.filter(item=> item !==id)
          }))
        console.log("Grocery list deleted from User successfully!");
      } catch (err) {
        console.log("error deleting list", err);
      }
    }

   async fetchUserGroceryLists(user) {
      try {
        // Filter DataStore GroceryList by User grocery lists in redux state since SelectiveSync will not update with removed ref
          const groceryListIDs = user.groceryLists || []
          const result = await this._dataStore.query(GroceryList, c => c.or((c) => {
            return groceryListIDs.reduce((acc, curVal) => {
              return acc.id('eq', curVal);
            }, c);
          }))
          console.log("grocery lists retrieved successfully!");
          return result
      } catch (error) {
        console.log("Error retrieving grocery lists", error);
      }
    }

  async addGroceryListToUser(id) {
    try {

      const user = await this._dataStore.query(User)
      await this._dataStore.save(
        User.copyOf(user[0], (updated) => {
          updated.groceryLists = updated.groceryLists ? 
          [...updated.groceryLists, id]
          : [id]
        }))
      console.log("Grocery list added to user successfully!");
    } catch (error) {
      console.log("Error adding grocery list to user", error);
    }
  }

  async updateGroceryListShoppers(id){
    try {
      const user = await this._dataStore.query(User)
      const groceryList = await this._dataStore.query(GroceryList, id)
      const updatedGroceryList = await this._dataStore.save(
        GroceryList.copyOf(groceryList, (updated) => {
          updated.shoppers = updated.shoppers ? 
          [...updated.shoppers, user[0].username]
          : [user[0].username]
        }))
      console.log("Shopper added to grocery list successfully!");
      return updatedGroceryList
    } catch (error) {
      console.log("Error adding shopper to grocery list", error);
    }
  }
  
   async createNewGroceryList (groceryList) {
      try {
        const user = await this._dataStore.query(User)
        const groceryListSaved = await this._dataStore.save(
        new GroceryList({
          name: groceryList.name,
          shoppers: [user[0].username],
        })
      );
      await this._dataStore.save(
        User.copyOf(user[0], (updated) => {
          updated.groceryLists = updated.groceryLists ? 
          [...updated.groceryLists, groceryListSaved.id]
          : [groceryListSaved.id]
        }))
      console.log("List saved successfully!");
      return groceryListSaved
    } catch (err) {
      console.log("error creating list:", err);
    }
  }

async updateGroceryListDetails(groceryList) {
  try {
    const original = await this._dataStore.query(GroceryList, groceryList.id);
    const updatedGroceryList =  await this._dataStore.save(
      GroceryList.copyOf(original, (updated) => {
        updated.name = groceryList.name
      }))
      console.log("GroceryList updated successfully!");
      return updatedGroceryList
   } catch (err) {
  console.log("error updating GroceryList:", err);
  }
  }
 async createNewProduct(product, groceryListID) {
    try {
      // Retrieve List object
      const currentList = await this._dataStore.query(GroceryList, groceryListID);
      // Add reference
      product.groceryListID = currentList.id;
      const productSaved = await this._dataStore.save(new Product(product));
      console.log("Product saved successfully!", productSaved);
      return productSaved
    } catch (err) {
      console.log("error creating product:", err);
    }
  }

async removeAllProducts(groceryListID){
  try {
    await this._dataStore.delete(Product, product => product.groceryListID("eq", groceryListID));
    console.log("Product deleted successfully from list!");
  } catch (err) {
    console.log("error deleting all items:", err);
  }
}

async toggleMultipleProducts(groceryListID, attribute, keepToBuy){
  try {
    const products = await this.fetchProductsByGroceryList(groceryListID)
    const productsSelected = products.filter(product => product[attribute] === true)
    for (let product of productsSelected){
      const original = await this._dataStore.query(Product, product.id);
        await this._dataStore.save(
          Product.copyOf(original, (updated) => {
            updated.toBuy = keepToBuy? true: false
            updated.checked = false
          }))
    }
    console.log("Products Removed from Cart successfully!");
  } catch (err) {
    console.log("error removing all items from Cart:", err);
  }
}
  
 async updateProductDetails(product) {
    try {
      const original = await this._dataStore.query(Product, product.id);
      const updatedProduct =  await this._dataStore.save(
        Product.copyOf(original, (updated) => {
          updated.checked = product.checked
          updated.toBuy = product.toBuy
          updated.category = product.category
          updated.name = product.name
          updated.unit = product.unit
          updated.quantity = product.quantity
        }))
        console.log("Product updated successfully!");
        return updatedProduct
     } catch (err) {
    console.log("error updating product:", err);
    }
  }
  
 async fetchProductsByGroceryList(groceryListID) {
    try {
      const data = (await this._dataStore.query(Product)).filter(
        (c) => c.groceryListID === groceryListID
      );
      console.log("products retrieved successfully!");
      return data
    } catch (error) {
      console.log("Error retrieving products", error);
    }
  }
  
 async removeProduct(id) {
    try {
      const todelete = await this._dataStore.query(Product, id);
      this._dataStore.delete(todelete);
    } catch (err) {
      console.log("error deleting product", err);
    }
  }
}

export const API = new BackendInterface(DataStore)