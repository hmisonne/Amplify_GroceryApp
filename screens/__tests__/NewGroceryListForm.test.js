import React from "react";
import { Provider } from "react-redux";
import store from "../../src/redux/store";
import { render, fireEvent } from "@testing-library/react-native";
import NewGroceryListForm from "../NewGroceryListForm";

test("adds a new Grocery List when the button is pressed", () => {
  const route = { params: {} };
  const mockFn = jest.fn();
  const navigation = { setOptions: mockFn };

  const component = (
    <Provider store={store}>
      <NewGroceryListForm route={route} navigation={navigation} />
    </Provider>
  );

  const { debug, getByText, getByTestId } = render(component);
  const input = getByTestId("TextInput");
  const button = getByText("Save");

  fireEvent.changeText(input, "Test List");
  expect(input).toBeTruthy();
  fireEvent.press(button);
  const userState = store.getState().user;
  expect(userState.groceryLists.length).toEqual(1);
});

// TODO: Important for this test to work

// Remove API call from handleCreateGroceryList function: redux/actions/groceryLists
// export function handleCreateGroceryList(groceryList) {
//     return (dispatch) => {
//               dispatch(addGroceryListToUser(groceryList))
//       }
//   }

// Add Save Button to <NewGroceryListForm/> return statement: button on header not rendered with jest