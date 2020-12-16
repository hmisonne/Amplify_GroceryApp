
import userReducer from "../reducers/user";

import { authentificateUser } from "../actions/user";
import { addGroceryListToUser, loadGroceryLists, deleteGroceryList } from "../actions/groceryList";

describe("user reducer", () => {
  const user = {
    sub: "012350",
    id: "1",
  };
  const groceryList1 = {
    name: "New List",
    id: "123",
  };
  const groceryList2 = {
    name: "New List2",
    id: "124",
  };
  const groceryLists = [groceryList1,groceryList2]

  it("should add the authed user to the state", () => {
    const newState = userReducer(undefined, authentificateUser(user));
    expect(newState).toEqual(user);
  });
  it("should add the grocery lists ref to a user", () => {
    const stateOne = userReducer(undefined, authentificateUser(user));
    const stateTwo = userReducer(stateOne, loadGroceryLists(groceryLists))
    expect(stateTwo.groceryLists.length).toEqual(2);
  });
  it("should add a grocery list ref to a user", () => {
    const stateOne = userReducer(undefined, authentificateUser(user));
    const stateTwo = userReducer(stateOne, addGroceryListToUser('123'))
    expect(stateTwo.groceryLists).toEqual(['123']);
  });
  it("should delete a grocery list ref from user groceryLists", () => {
    const stateOne = userReducer(undefined, authentificateUser(user));
    const stateTwo = userReducer(stateOne, loadGroceryLists(groceryLists));
    const stateThree = userReducer(stateTwo, deleteGroceryList('123'))
    expect(stateThree.groceryLists.length).toEqual(stateTwo.groceryLists.length-1);
    expect(stateThree.groceryLists[0]).not.toEqual('123');
  });
});
