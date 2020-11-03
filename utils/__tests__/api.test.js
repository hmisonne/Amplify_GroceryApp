import { BackendInterface } from "../api";

jest.mock("aws-amplify", () => {
  return true;
});

jest.mock("../../src/models", () => {
  function User(sub) {
    this.sub = sub;
  }
  return User;
});

jest.mock("@aws-amplify/datastore", () => {
  return true;
});

describe("Backend Interface with Datastore", () => {
  describe("case 1 : GroceryLists", () => {
    const dataStore = {
      save: () => "save",
      delete: () => "delete",
      query: () => [
        {
          id: "1",
          name: "test",
          groceryList: { id: "1" },
        },
        {
          id: "2",
          name: "test",
          groceryList: { id: "2" },
        },
      ],
    };
    const API = new BackendInterface(dataStore);
    test("fetchAllGroceryLists should return all items from the datastore", () => {
      return API.fetchAllGroceryLists().then((data) => {
        expect(data.length).toBe(2);
      });
    });
    test("fetchProductsByGroceryList should return the items that belongs to the specified grocery list from the datastore", () => {
      let id = "1";
      return API.fetchProductsByGroceryList(id).then((data) => {
        expect(data.length).toBe(1);
        expect(data[0].groceryList.id).toBe(id);
      });
    });
  });
  // describe("case 2 : Users", () => {
  //   class User {
  //     constructor(sub){
  //       this._sub = sub
  //     }
  //   }
  //   const dataStore = {
  //     save: () => "save",
  //     delete: () => "delete",
  //     query: () => "query"
  //   };
  //   const API = new BackendInterface(dataStore, User);
  //   test("createUser should trigger dataStore.save", () => {
  //     const userInfo ={attributes: {sub: "1"}}
  //     return API.createUser(userInfo).then((data) => {
  //       expect(data).toBe("save")
  //     });
  //   });
  // });
});
