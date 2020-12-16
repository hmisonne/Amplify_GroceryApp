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
    deleteProduct={x=>x}
    navigateToEditProduct={x=>x}
    toggleProduct={x=>x}
    toBuyView={true}/>).toJSON();
  expect(tree).toMatchSnapshot();
});