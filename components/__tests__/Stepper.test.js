import React from 'react';
import renderer from 'react-test-renderer';
import Stepper from '../Stepper';

jest.mock("@expo/vector-icons", () => {
    return {
      MaterialCommunityIcons: () => {
        return <></>;
      },
    };
  });


test('renders correctly', () => {
  const tree = renderer.create(<Stepper
    onIncrement={(x)=>x} 
    onDecrement={(x)=>x}/>).toJSON();
  expect(tree).toMatchSnapshot();
});