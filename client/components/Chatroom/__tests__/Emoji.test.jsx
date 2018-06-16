import React from 'react';
import { shallow } from 'enzyme';
import Emoji from '../Emoji';

describe('Emoji ', () => {
  const wrapped = shallow(<Emoji />);

  it('has emoji button', () => {
    expect(wrapped.find('button').length).toEqual(1);
  });

  it('has emoji picker', () => {
    expect(wrapped.find('Picker').length).toEqual(1);
  });
});
