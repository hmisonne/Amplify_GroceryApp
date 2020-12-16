import React from 'react';
import renderer from 'react-test-renderer';
import AccordionMenu from '../AccordionMenu';

jest.mock("@expo/vector-icons", () => {
    return {
        Ionicons: () => {
        return <></>;
      },
    };
  });

test('renders correctly', () => {
  const tree = renderer.create(<AccordionMenu
    text={''} 
    expanded={true}
    handlePress={(x) => x}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});