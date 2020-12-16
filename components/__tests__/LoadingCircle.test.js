import React from 'react';
import renderer from 'react-test-renderer';
import LoadingCircle from '../LoadingCircle';

jest.useFakeTimers();

test('renders correctly', () => {
  const tree = renderer.create(<LoadingCircle
    />).toJSON();
  expect(tree).toMatchSnapshot();
});