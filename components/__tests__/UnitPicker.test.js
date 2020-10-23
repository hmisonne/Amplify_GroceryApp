import React from 'react';
import renderer from 'react-test-renderer';
import UnitPicker from '../UnitPicker';

test('renders correctly', () => {
  const tree = renderer.create(<UnitPicker
    selectedValue={'ct'}
    onValueChange={(x) => x}
    value={'kg'}
    units={['ct','kg']} />).toJSON();
  expect(tree).toMatchSnapshot();
});