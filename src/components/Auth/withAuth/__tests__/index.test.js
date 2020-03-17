import React from 'react';
import { render } from '@testing-library/react';
import withAuth from '../index';
import AuthRouter from '../../AuthRouter';

const renderWithAuth = (
  mockIsAuth,
  mockIsVerifying,
  mockAuthorizes,
  mockOtherProp
) => {
  const WithAuthTestRender = withAuth(
    ({ authorizes, isAuth, isAuthVerifying, otherProp }) => {
      return (
        <div>
          <p>isAuth: {isAuth ? 'true' : 'false'}</p>
          <p>isVerifying: {isAuthVerifying ? 'true' : 'false'}</p>
          <p>authorizes: {authorizes && authorizes.join(',')}</p>
          <p>otherProp: {otherProp}</p>
        </div>
      );
    }
  );
  const { queryByText, ...others } = render(
    <AuthRouter
      isAuth={mockIsAuth}
      isVerifying={mockIsVerifying}
      authorizes={mockAuthorizes}
    >
      <WithAuthTestRender otherProp={mockOtherProp} />
    </AuthRouter>
  );
  return {
    ...others,
    getIsAuthValueText: value =>
      queryByText(new RegExp(`^isAuth: ${value}$`, 'i')),
    getIsVerifyingValueText: value =>
      queryByText(new RegExp(`^isVerifying: ${value}$`, 'i')),
    getAuthorizesValueText: value =>
      queryByText(new RegExp(`^authorizes: ${value}$`, 'i')),
    getOtherPropText: value =>
      queryByText(new RegExp(`^otherProp: ${value}$`, 'i'))
  };
};

describe('withAuth', () => {
  test('connected component should get props from AuthRouter correctly', () => {
    const {
      getIsAuthValueText,
      getIsVerifyingValueText,
      getAuthorizesValueText,
      getOtherPropText
    } = renderWithAuth(true, false, ['dev', 'tester'], 'rocky');

    expect(getIsAuthValueText('true')).toBeInTheDocument();
    expect(getIsVerifyingValueText('false')).toBeInTheDocument();
    expect(getAuthorizesValueText('dev,tester')).toBeInTheDocument();
    expect(getOtherPropText('rocky')).toBeInTheDocument();
  });
});
