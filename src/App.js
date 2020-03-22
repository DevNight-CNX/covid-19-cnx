import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/analytics';

import { Report as ReportProvider } from 'contexts/report.context';

import { News as NewsProvider } from 'contexts/news.context';
import 'firebase/auth';
import 'firebase/messaging';
import GlobalStyled from './GlobalStyled';
import theme from './styles/theme';
import Router from './Router';
import ScrollToTop from './components/ScrollToTop';
import getStore from './stores';
import RemoveFocusWhenNotTab from './components/RemoveFocusWhenNotTab';
import './i18n';
import AuthManager from './components/AuthManager';
import FcmManager from './components/FcmManager';
import LogRocketTracking from 'LogRocketTracking';

const firebaseConfig = {
  apiKey: 'AIzaSyCgcd4bi5rNnpC9Wi4Czqk9lPWFh7Sf7lw',
  authDomain: 'covid-19-cnx.firebaseapp.com',
  projectId: 'covid-19-cnx',
  appId: '1:354956353010:web:a7040da3fd713c516b5f6b',
  measurementId: 'G-0BNFH5Q9KM',
  messagingSenderId: '354956353010'
};

firebase.initializeApp(firebaseConfig);

export const FirebaseContext = createContext();

const store = getStore();

const App = () => {
  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={firebase}>
        <AuthManager>
          <FcmManager>
            <BrowserRouter>
              <ThemeProvider theme={theme}>
                <ReportProvider>
                  <NewsProvider>
                    <ScrollToTop>
                      <>
                        <Router />
                        <GlobalStyled />
                        <RemoveFocusWhenNotTab />
                        <LogRocketTracking />
                      </>
                    </ScrollToTop>
                  </NewsProvider>
                </ReportProvider>
              </ThemeProvider>
            </BrowserRouter>
          </FcmManager>
        </AuthManager>
      </FirebaseContext.Provider>
    </Provider>
  );
};

export default App;
