import React from 'react';
import LikeManager from 'components/LikeManager';

const LikeExample = () => {
  return (
    <div>
      <p>Like Example</p>
      <LikeManager
        reportId="1584782312449"
        likeList={[
          'LsD7wOzQkVaezQfyux9bGzlDZvR2',
          'efr343434fwemfweklrm',
          'rdsdwqeweewjgjgjfff'
        ]}
        dislikeList={['rr24242423424234234ff', 'fkdfemwelmrlererrere']}
        render={({
          likeCount,
          dislikeCount,
          onLikeClick,
          onDislikeClick,
          status
        }) => (
          <div>
            <p>Like: {likeCount}</p>
            <p>DisLike: {dislikeCount}</p>
            <button onClick={onLikeClick}>
              {status === LikeManager.status.like ? 'Liked' : 'Like'}
            </button>
            <button onClick={onDislikeClick}>
              {status === LikeManager.status.dislike ? 'Disliked' : 'Dislike'}
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default LikeExample;
