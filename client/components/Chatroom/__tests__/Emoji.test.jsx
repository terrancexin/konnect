import React from 'react';
import { shallow } from 'enzyme';
import { Emoji } from '../Emoji';

describe('Emoji ', () => {
  const props = {
    addEmoji: () => {},
    toggleEmoji: false,
    handleToggleEmoji: () => {},
    handleToggleGiphy: () => {},
  };

  const wrapped = shallow(<Emoji {...props} />);

  it('has emoji button', () => {
    expect(wrapped.find('button').length).toEqual(1);
  });
});
