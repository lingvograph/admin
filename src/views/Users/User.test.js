import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import User from './User';
import usersData from './UsersData';

it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <User user={usersData[0]}/>
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
