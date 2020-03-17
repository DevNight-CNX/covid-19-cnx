import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyled from './GlobalStyled';
import theme from './styles/theme';
import Router from './Router';
import ScrollToTop from './components/ScrollToTop';
import getStore from './stores';
import RemoveFocusWhenNotTab from './components/RemoveFocusWhenNotTab';
import './i18n';

const store = getStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ScrollToTop>
            <>
              <Router />
              <GlobalStyled />
              <RemoveFocusWhenNotTab />
            </>
          </ScrollToTop>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
