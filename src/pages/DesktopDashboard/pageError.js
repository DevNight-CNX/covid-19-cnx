import React from 'react';

const ErrorPage = () => {
  return (
    <button
      onClick={() => {
        throw new Error('testing error');
      }}
    >
      Test Error
    </button>
  );
};

export default ErrorPage;
