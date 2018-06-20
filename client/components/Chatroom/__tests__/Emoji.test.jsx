import React from 'react';
import { shallow } from 'enzyme';
import { Emoji } from '../Emoji';

describe('Emoji ', () => {
  const props = {
    addEmoji: jest.fn(),
    handleToggleEmoji: jest.fn(),
    handleToggleGiphy: jest.fn(),
    toggleEmoji: false,
  };

  const wrapped = shallow(<Emoji {...props} />);

  it('has emoji button', () => {
    expect(wrapped.find('button').length).toEqual(1);
  });
});
