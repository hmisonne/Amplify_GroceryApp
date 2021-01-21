import React from 'react';
import renderer from 'react-test-renderer';
import Snackbar from '../SnackBar';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test('renders correctly', () => {
  const tree = renderer.create(<Snackbar
    visible={true}
    onDismissSnackBar={(x)=>x}
    undoAction={(x)=>x}
    snackContent={''} 
    />).toJSON();
  expect(tree).toMatchSnapshot();
});