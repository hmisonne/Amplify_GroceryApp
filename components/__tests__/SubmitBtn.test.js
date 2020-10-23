import React from 'react';
import renderer from 'react-test-renderer';
import SubmitBtn from '../SubmitBtn';

test('renders correctly', () => {
  const tree = renderer.create(<SubmitBtn
    title='title'
    onPress={x=>x} />).toJSON();
  expect(tree).toMatchSnapshot();
});