import React from 'react';
import renderer from 'react-test-renderer';
import SwipeList from '../SwipeList';

jest.mock("@expo/vector-icons", () => {
    return {
      MaterialCommunityIcons: () => {
        return <></>;
      },
    };
  });


test('renders correctly', () => {
  const tree = renderer.create(<SwipeList
    listData={[]}
    deleteAction={x=>x}
    navigateToEdit={x=>x}
    onPressAction={x=>x}/>).toJSON();
  expect(tree).toMatchSnapshot();
});