import React from 'react';
import renderer from 'react-test-renderer';
import RoundButton from '../RoundButton';

jest.mock("@expo/vector-icons", () => {
    return {
      MaterialCommunityIcons: () => {
        return <></>;
      },
    };
  });


test('renders correctly', () => {
  const tree = renderer.create(<RoundButton
    onPress={(x)=>x} 
    name={'button'} 
    color={'red'} />).toJSON();
  expect(tree).toMatchSnapshot();
});