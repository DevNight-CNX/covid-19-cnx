import React from 'react';
import { useNews } from 'contexts/news.context';
import eventTracker from 'utils/eventTracker';
import ViewSituationNews from './index.view';
import { GoBackHeader } from 'components/BarNavigation/navigation';

const ShowAllNews = () => {
  const { unknowLocationNews } = useNews();
  const onClickCard = (url, id) => {
    window.open(url);
    eventTracker({ type: 'cardNewsClicked', id });
  };
  return (
    <>
      <GoBackHeader mxwidth="680px" link={'/'} />
      <ViewSituationNews news={unknowLocationNews} onClickCard={onClickCard} />
    </>
  );
};

export default ShowAllNews;
