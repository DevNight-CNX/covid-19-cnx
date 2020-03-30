import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/analytics';

import { Report as ReportProvider } from 'contexts/report.context';

import { News as NewsProvider } from 'contexts/news.context';

import { Summarys as SummarysProvider } from 'contexts/summarys.context';
import { ScreeningPoint as ScreeningPointProvider } from 'contexts/screeningPoint.context';
import 'firebase/auth';
import 'firebase/messaging';
import 'firebase/firestore';
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
import env from 'utils/env';
import '../node_modules/react-vis/dist/style.css';

const firebaseConfig = JSON.parse(env.get('FIREBASE'));

firebase.initializeApp(firebaseConfig);

export const FirebaseContext = createContext();

const store = getStore();

if (!env.isServerLocalhost()) {
  firebase.analytics();
}

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
                    <SummarysProvider>
                      <ScreeningPointProvider>
                        <ScrollToTop>
                          <>
                            <Router />
                            <GlobalStyled />
                            <RemoveFocusWhenNotTab />
                            <LogRocketTracking />
                          </>
                        </ScrollToTop>
                      </ScreeningPointProvider>
                    </SummarysProvider>
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
