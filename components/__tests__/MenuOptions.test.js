import React from 'react';
import renderer from 'react-test-renderer';
import MenuOptions from '../MenuOptions';

jest.mock("@expo/vector-icons", () => {
    return {
      MaterialCommunityIcons: () => {
        return <></>;
      },
    };
  });
  
test('renders correctly', () => {
  const tree = renderer.create(<MenuOptions
    actionsMenu={[]}
    groceryList={''}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});