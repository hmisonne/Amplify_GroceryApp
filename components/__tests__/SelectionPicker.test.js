import React from 'react';
import renderer from 'react-test-renderer';
import SelectionPicker from '../SelectionPicker';

test('renders correctly', () => {
  const tree = renderer.create(<SelectionPicker
    selectedValue={'ct'}
    onValueChange={(x) => x}
    value={'kg'}
    selection={['ct','kg']} />).toJSON();
  expect(tree).toMatchSnapshot();
});