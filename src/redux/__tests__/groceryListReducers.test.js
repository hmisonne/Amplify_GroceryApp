
import { groceryListReducer } from "../reducers/groceryLists";

import {
  createGroceryList,
  loadGroceryLists,
  deleteGroceryList,
  updateGroceryList
} from "../actions/groceryList";


describe("list reducer", () => {
  const groceryList = {
    name: "New List",
    id: "1",
  };
  const groceryList2 = {
    name: "New List2",
    id: "2",
  };

  it("should load 2 grocery lists", () => {
    const newState = groceryListReducer(
      undefined,
      loadGroceryLists([groceryList, groceryList2])
    );
    expect(newState.length).toEqual(2);
  });
  it("should remove a grocery lists", () => {
    const stateOne = groceryListReducer(
      undefined,
      loadGroceryLists([groceryList, groceryList2])
    );
    const stateTwo = groceryListReducer(stateOne, deleteGroceryList("1"));
    expect(stateTwo.length).toEqual(stateOne.length - 1);
    expect(stateTwo[0].id).toEqual("2");
  });
  it("should create a grocery list", () => {
    const newState = groceryListReducer(
      undefined,
      createGroceryList(groceryList)
    );
    expect(newState.length).toEqual(1);
    expect(newState[0]).toEqual(groceryList);
  });
  it("should update a grocery list", () => {
    const updatedGroceryList = {
        name: "New List1",
        id: "1",
      };
    const stateOne = groceryListReducer(
        undefined,
        loadGroceryLists([groceryList, groceryList2])
      );
    const stateTwo = groceryListReducer(stateOne, updateGroceryList(updatedGroceryList));
    expect(stateTwo.length).toEqual(2);
    expect(stateTwo[0]).toEqual(updatedGroceryList);
  });
  // it('should add 1 grocery list', () => {
  //     const newState = groceryListReducer(undefined, addGroceryListToUser(groceryList.id))
  //     expect(newState.length).toEqual(1)
  //     expect(newState[0]).toEqual(groceryList)
  // });
});