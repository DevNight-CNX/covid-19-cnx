import React from 'react';
import { render } from '@testing-library/react';
import AuthGet from '../index';
import AuthRouter from '../../AuthRouter';

const renderAuthGet = (authRouterIsAuth, authorizes, isVerifying, mockRender) =>
  render(
    <AuthRouter
      isAuth={authRouterIsAuth}
      authorizes={authorizes}
      isVerifying={isVerifying}
    >
      <AuthGet render={mockRender} />
    </AuthRouter>
  );

describe('AuthGet', () => {
  const mockRender = jest.fn();

  afterEach(() => {
    mockRender.mockClear();
  });

  test('should call render function correctly', () => {
    renderAuthGet(true, ['dev', 'admin', 'po'], false, mockRender);
    expect(mockRender).toHaveBeenLastCalledWith({
      isAuth: true,
      authorizes: ['dev', 'admin', 'po'],
      isVerifying: false
    });
  });

  test('should call render function with default correctly', () => {
    renderAuthGet(undefined, undefined, undefined, mockRender);
    expect(mockRender).toHaveBeenLastCalledWith({
      isAuth: false,
      authorizes: [],
      isVerifying: false
    });
  });
});
