import React from 'react';
import { ThemeProvider } from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import StoryRouter from 'storybook-react-router';
import theme from '../src/styles/theme';
import GlobalStyled from '../src/GlobalStyled';

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <>
      {storyFn()}
      <GlobalStyled />
    </>
  </ThemeProvider>
);

addDecorator(withInfo);
addDecorator(ThemeDecorator);
addDecorator(StoryRouter());

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
