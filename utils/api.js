import { User, GroceryList, Product } from "../src/models";
import { DataStore, Auth, syncExpression, Hub } from 'aws-amplify'

// let groceryListIDs = ['1b2c6e03-241a-4205-b884-5dfe132b526d','306ac6f3-ea62-4d5f-aee7-f7112d716db3']
let groceryListIDs = ['']

const listPredicate = (c, list, field) => {
  return c.or((c) => list.reduce((_c, operand) => _c[field]('eq', operand), c));
};

DataStore.configure({
  syncExpressions: [
    syncExpression(Product, () => {
      return (c) => listPredicate(c, groceryListIDs, 'groceryListID');
    }),
    syncExpression(GroceryList, () => {
      return (c) => listPredicate(c, groceryListIDs, 'id');
    }),
  ],
});

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
      this.getGroceryListIDForSync()
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
  
//  async fetchAllGroceryLists() {
//     try {
//       const allGroceryLists = await this._dataStore.query(GroceryList);
//       console.log("grocery lists retrieved successfully!");
//       return allGroceryLists;
//     } catch (error) {
//       console.log("Error retrieving grocery lists", error);
//     }
//   }
  
 async removeGroceryListFromUser(id, user) {
      try {
        // const result = (await this._dataStore.query(UserGroceryListJoin))
        // .filter(c => c.groceryList.id === id)
        // .filter(c => c.user.id === user.id)
        const original = await this._dataStore.query(User)
        await this._dataStore.save(
          User.copyOf(original[0], (updated) => {
            updated.groceryListID = null
          }))
        // this._dataStore.delete(result[0]);
        console.log("Grocery list deleted from User successfully!");
      } catch (err) {
        console.log("error deleting list", err);
      }
    }

   async getGroceryListIDForSync() {
    try {
      const users = await this._dataStore.query(User)
      const userGroceryListID = users[0].groceryListID
      // const groceryLists = await this.fetchUserGroceryLists(userID)
      if (userGroceryListID) {
        groceryListID.push(userGroceryListID)
        await DataStore.stop();
        await DataStore.start();
      }
      console.log("grocery list ID retrieved successfully for sync!", userGroceryListID);
    } catch (error) {
      console.log("Error retrieving grocery list ID", error);
    }
   }
   async fetchUserGroceryLists(userID) {
      try {
          const result = await this._dataStore.query(GroceryList)
          // const result = (await this._dataStore.query(UserGroceryListJoin)).filter(c => c.user.id === userID)
          console.log('result',result)
          // const groceryListsPerUser = result.map(element => element.groceryList) || []
          console.log("grocery lists retrieved successfully!", result);
          return result
      } catch (error) {
        console.log("Error retrieving grocery lists", error);
      }
    }
    async syncDatastore(id){
      groceryListID = id
      await DataStore.stop();
      await DataStore.start();
      // setTimeout(()=> addGroceryListToUser2(id, currUser),1000)
      // await this.dataStoreisReady()
    }
    async dataStoreisReady(){
      
    //   Hub.listen('datastore', (data) => {
    //     const { payload } = data;
    //     if(payload.event === 'ready'){
    //       console.log('ready')
    //       return
    //     } else {
    //       console.log('NOT ready')
    //       this.dataStoreisReady()
    //     }   
    // })
  }
  async addGroceryListToUser(groceryListID) {
    try {

      const groceryList = await this._dataStore.query(GroceryList, groceryListID)
      console.log('groceryList',groceryList)

      // await this._dataStore.save(
      //   new UserGroceryListJoin({
      //     user,
      //     groceryList
      //   })
      // )
      console.log("Grocery list added to user successfully!");
      return groceryList
    } catch (error) {
      console.log("Error adding grocery list to user", error);
    }
  }
  async updateUser(groceryListID) {
    try {
      this.syncDatastore(groceryListID)
      const original = await this._dataStore.query(User)
      await this._dataStore.save(
        User.copyOf(original[0], (updated) => {
          updated.groceryListID = groceryListID
        }))
      return original
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
      const original = await this._dataStore.query(User)
      await this._dataStore.save(
        User.copyOf(original[0], (updated) => {
          updated.groceryListID = groceryListID
        }))
      // const user = await this._dataStore.query(User, currentUser.id)
  
      // await this._dataStore.save(
      //   new UserGroceryListJoin({
      //     user,
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
  
 async  fetchProductsByGroceryList(groceryListID) {
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