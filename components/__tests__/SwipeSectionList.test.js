import React from 'react';
import renderer from 'react-test-renderer';
import SwipeSectionList from '../SwipeSectionList';

jest.mock("@expo/vector-icons", () => {
    return {
      MaterialCommunityIcons: () => {
        return <></>;
      },
    };
  });


test('renders correctly', () => {
  const tree = renderer.create(<SwipeSectionList
    listData={[]}
    deleteAction={x=>x}
    navigateToEdit={x=>x}
    onPressAction={x=>x}
    toBuyView={true}
    fabAction={x=>x}
    itemsInCart={true}
    groceryListID={''}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});