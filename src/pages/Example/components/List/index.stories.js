import React from 'react';
import { storiesOf } from '@storybook/react';
import List from './index';

const mockItems = [
  {
    title: 'Todo List',
    description: 'implement todo list example using redux.',
    linkTo: '/'
  },
  {
    title: 'List Data',
    description: 'implement list data using redux.',
    linkTo: '/'
  },
  {
    title: 'Form',
    description: 'implement form using react-final-form.',
    linkTo: '/'
  }
];

storiesOf('Example List', module).add('normal state', () => (
  <List items={mockItems} />
));
