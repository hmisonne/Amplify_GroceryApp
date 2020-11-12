import { User, GroceryList, Product } from "../src/models";
import { DataStore, Auth } from 'aws-amplify'

export class BackendInterface {
  constructor(dataStore) {
      this._dataStore = dataStore
      this.syncReady = false
  }
 async identifyUser() {
    try {
      const userInfo = await Auth.currentUserInfo();
      const result = await this._dataStore.query(User, (c) =>
        c.sub("eq", userInfo.attributes.sub,)
      );
  
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
      console.log("new User created successfully", newUser);
      return newUser;
    } catch (err) {
      console.log("error creating new User", err);
    }
  }
  
 async removeGroceryListFromUser(id, user) {
      try {
        // const result = (await this._dataStore.query(UserGroceryListJoin))
        // .filter(c => c.groceryList.id === id)
        // .filter(c => c.user.id === user.id)
        const original = await this._dataStore.query(User)
        const newUser = await this._dataStore.save(
          User.copyOf(original[0], (updated) => {
            updated.groceryLists = updated.groceryLists.filter(item=> item !==id)
          }))
        // this._dataStore.delete(result[0]);
        console.log("Grocery list deleted from User successfully!",newUser);
      } catch (err) {
        console.log("error deleting list", err);
      }
    }

   async fetchUserGroceryLists(user) {
      try {
          const groceryListIDs = user.groceryLists
          const result = await this._dataStore.query(GroceryList)
          console.log('Redux glist',groceryListIDs)
          console.log('datastore glist',result)
          // const result = await this._dataStore.query(GroceryList)
          const result2 = await this._dataStore.query(GroceryList, c => c.or((c) => {
            return groceryListIDs.reduce((acc, curVal) => {
              return acc.id('eq', curVal);
            }, c);
          }))
          
          // const result = (await this._dataStore.query(UserGroceryListJoin)).filter(c => c.user.id === userID)
          // const groceryListsPerUser = result.map(element => element.groceryList) || []
          console.log("grocery lists retrieved successfully!", result2);
          return result2
      } catch (error) {
        console.log("Error retrieving grocery lists", error);
      }
    }

  async addGroceryListToUser(id) {
    try {

      // const groceryList = await this._dataStore.query(GroceryList, id)
      // const groceryList = await this._dataStore.query(GroceryList)
      // const groceryList = result[result.length - 1]
      const user = await this._dataStore.query(User)
      const newUser = await this._dataStore.save(
        User.copyOf(user[0], (updated) => {
          updated.groceryLists = updated.groceryLists ? 
          [...updated.groceryLists, id]
          : [id]
        }))
      // console.log('groceryList',groceryList,'user',user)
      // await this._dataStore.save(
      //   new UserGroceryListJoin({
      //     user: user[0],
      //     groceryList
      //   })
      // )
      console.log("Grocery list added to user successfully!", newUser);
      // return groceryList
    } catch (error) {
      console.log("Error adding grocery list to user", error);
    }
  }
    async fetchGroceryListByID(groceryListID) {
      try {
        const groceryList = await this._dataStore.query(GroceryList, groceryListID)
        console.log("Grocery list identified!", groceryList);
        return groceryList
      } catch (error) {
        console.log("Error fetching grocery list by ID", error);
      }
    }
  
  
   async createNewGroceryList (groceryList, currentUser) {
      try {
        const groceryListSaved = await this._dataStore.save(
        new GroceryList({
          name: groceryList.name,
          description: groceryList.description,
        })
      );
      const user = await this._dataStore.query(User)
      await this._dataStore.save(
        User.copyOf(user[0], (updated) => {
          updated.groceryLists = updated.groceryLists ? 
          [...updated.groceryLists, groceryListSaved.id]
          : [id]
        }))
      // const user = await this._dataStore.query(User, currentUser.id)
  
      // await this._dataStore.save(
      //   new UserGroceryListJoin({
      //     user: user[0],
      //     groceryList: groceryListSaved
      //   })
      // )
      console.log("List saved successfully!");
      return groceryListSaved
    } catch (err) {
      console.log("error creating list:", err);
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
      console.log("error creating food:", err);
    }
  }
  
  
 async updateProductDetails(product) {
    try {
      const original = await this._dataStore.query(Product, product.id);
      const updatedProduct =  await this._dataStore.save(
        Product.copyOf(original, (updated) => {
          updated.checked = product.checked
          updated.category = product.category
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
  
 async fetchProductsByGroceryList(groceryListID) {
    try {
      const data = (await this._dataStore.query(Product)).filter(
        (c) => c.groceryListID === groceryListID
      );
      console.log("products retrieved successfully!", data);
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