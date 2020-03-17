import React from 'react';
import { render } from '@testing-library/react';
import AuthRouter from '../index';

const renderAuthRouter = isVerifying => {
  const testUtils = render(
    <AuthRouter isVerifying={isVerifying}>
      <p>Content</p>
    </AuthRouter>
  );

  const { queryByText } = testUtils;

  return {
    ...testUtils,
    getContent: () => queryByText('Content')
  };
};

describe('AuthRouter', () => {
  test('should render children if isVerifying prop not provided', () => {
    const { getContent } = renderAuthRouter();
    expect(getContent()).toBeInTheDocument();
  });
  test('should render children if isVerifying prop is provided to be false', () => {
    const { getContent } = renderAuthRouter(false);
    expect(getContent()).toBeInTheDocument();
  });

  test('should not render children if isVerifying prop is provided to be true', () => {
    const { getContent } = renderAuthRouter(true);
    expect(getContent()).not.toBeInTheDocument();
  });
});
