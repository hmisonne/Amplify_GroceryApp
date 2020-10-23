import React from 'react';
import renderer from 'react-test-renderer';
import StyledTextInput from '../StyledTextInput';


test('renders correctly', () => {
  const tree = renderer.create(<StyledTextInput
    value={''} 
    placeholder={''}
    onChangeText={x => x} />).toJSON();
  expect(tree).toMatchSnapshot();
});