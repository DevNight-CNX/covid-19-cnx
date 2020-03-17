import React from 'react';
import { storiesOf } from '@storybook/react';
import Item from './index';

const mockItem = {
  title: 'Form',
  description: 'implement form using react-final-form.',
  linkTo: '/'
};

storiesOf('Example List Item', module).add('normal state', () => (
  <Item {...mockItem} />
));
