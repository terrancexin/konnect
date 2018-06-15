import React from 'react';
import { shallow } from 'enzyme';
import PrivateChat from '../PrivateChat';

it('first test', () => {
  const wrapped = shallow(<PrivateChat />);
  expect(wrapped.find('div').length).toEqual(1);
});
