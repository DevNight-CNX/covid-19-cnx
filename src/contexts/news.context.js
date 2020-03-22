import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'utils/useFetch';
import { getNews } from 'services/data';

const NewsContext = createContext();

const NewsProvider = NewsContext.Provider;

const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

const NewsPropTypes = {
  children: PropTypes.node
};

const News = ({ children }) => {
  const { data: news, loading } = useFetch(() => getNews(), null, []);

  return (
    <NewsProvider
      value={{
        news,
        newsLoading: loading
      }}
    >
      {children}
    </NewsProvider>
  );
};

News.propTypes = NewsPropTypes;

export { News, useNews };
