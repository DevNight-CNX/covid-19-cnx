import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useFirestore from 'utils/useFirestore';

const parseNews = item => {
  return {
    time: item.time,
    newsLink: item.news_links,
    newsId: item.news_id,
    location: item.location,
    title: item.title,
    id: item.id,
    unknownLocation: item.unknown_location,
    logo: item.logo
  };
};

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
  const { data: news, loading } = useFirestore(
    db => db.collection('news'),
    parseNews
  );

  return (
    <NewsProvider
      value={{
        news: news.filter(newsItem => !newsItem.unknownLocation),
        newsLoading: loading,
        unknowLocationNews: news.filter(newsItem => newsItem.unknownLocation)
      }}
    >
      {children}
    </NewsProvider>
  );
};

News.propTypes = NewsPropTypes;

export { News, useNews };
