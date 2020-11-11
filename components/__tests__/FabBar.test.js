import React from 'react';
import renderer from 'react-test-renderer';
import FabBar from '../FabBar';

test('renders correctly', () => {
  const tree = renderer.create(<FabBar
    actions={[]}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});