import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Users } from './Users';
import usersData from './UsersData'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    items: usersData,
    total: usersData.length,
    limit: 100,
  };
  ReactDOM.render(<MemoryRouter><Users {...props} /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
