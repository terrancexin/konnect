import React from 'react';
import { shallow } from 'enzyme';
import PrivateChat from '../PrivateChat';

describe('Private Chat ', () => {
  const wrapped = shallow(<PrivateChat />);

  it('has wrapper div', () => {
    expect(wrapped.find('div').length).toEqual(1);
  });

  it('shows contains the text coming soon', () => {
    expect(wrapped.text()).toContain('Coming Soon');
  });
});

