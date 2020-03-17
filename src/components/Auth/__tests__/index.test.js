import React from 'react';
import { MemoryRouter, Link, Route } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import mockConsole from 'jest-mock-console';
import AuthRouter from '../AuthRouter';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

const renderAuth = ({ isAuth = false } = {}) => {
  const testUtils = render(
    <MemoryRouter>
      <AuthRouter
        isAuth={isAuth}
        privateKickTo="/islandall"
        publicKickTo="/island/public/all"
      >
        <nav>
          <Link to="/user">go to user page</Link>
          <Link to="/user2">go to user2 page</Link>
          <Link to="/home">go to home page</Link>
          <Link to="/login">go to login page</Link>
          <Link to="/about">go to about page</Link>
        </nav>
        <div>
          <Route path="/home" render={() => <p>home</p>} />
          <Route path="/island" render={() => <p>island</p>} />
          <Route path="/islandall" render={() => <p>island all</p>} />
          <Route
            exact
            path="/island/public"
            render={() => <p>island public not all</p>}
          />
          <Route
            path="/island/public/all"
            render={() => <p>island public all</p>}
          />

          <PrivateRoute
            path="/user"
            kickTo="/island"
            render={() => <p>user1</p>}
          />
          <PrivateRoute path="/user2" render={() => <p>user2</p>} />
          <PublicRoute path="/login" render={() => <p>login page</p>} />
          <PublicRoute
            path="/about"
            kickTo="/island/public"
            render={() => <p>about</p>}
          />
        </div>
      </AuthRouter>
    </MemoryRouter>
  );

  const { getByText } = testUtils;

  return {
    ...testUtils,
    getUserLink: () => getByText('go to user page'),
    getUser2Link: () => getByText('go to user2 page'),
    getHomeLink: () => getByText('go to home page'),
    getLoginLink: () => getByText('go to login page'),
    getAboutLink: () => getByText('go to about page')
  };
};

const renderAuthorizes = (isAuth, authorizes, privatekickTo = '/island') => {
  const testUtils = render(
    <MemoryRouter>
      <AuthRouter
        isAuth={isAuth}
        privateKickTo={privatekickTo}
        publicKickTo="/"
        authorizes={authorizes}
      >
        <nav>
          <Link to="/manager">Manager</Link>
          <Link to="/po">Product Owner</Link>
          <Link to="/dev">Developer</Link>
        </nav>
        <div>
          <Route
            path="/islandforauthen"
            render={() => <p>your authentication is invalid</p>}
          />
          <Route
            path="/islandforauthorize"
            render={() => <p>your authorization is invalid</p>}
          />
          <PrivateRoute
            path="/manager"
            kickTo={{
              authen: '/island',
              authorize: '/islandforauthorize'
            }}
            authorizes={['manager', 'admin']}
            render={() => <p>Manager Section</p>}
          />
          <PrivateRoute
            path="/po"
            kickTo="/island"
            authorizes={['po', 'admin']}
            render={() => <p>Product Owner section</p>}
          />
          <PrivateRoute
            path="/dev"
            authorizes={['dev', 'admin']}
            render={() => <p>Developer section</p>}
          />
        </div>
      </AuthRouter>
    </MemoryRouter>
  );

  const { getByText, queryByText } = testUtils;
  return {
    ...testUtils,
    getManagerLink: () => getByText('Manager'),
    getPoLink: () => getByText('Product Owner'),
    getDevLink: () => getByText('Developer'),
    getManagerSection: () => queryByText('Manager Section'),
    getPoSection: () => queryByText('Product Owner section'),
    getDevSection: () => queryByText('Developer section'),
    getIslandForAuthen: () => queryByText('your authentication is invalid'),
    getIslandForAuthorize: () => queryByText('your authorization is invalid'),
    getIslandForAuthorizePath: () => '/islandforauthorize'
  };
};

const renderAuthNoKickTo = () =>
  render(
    <MemoryRouter>
      <AuthRouter isAuth={false}>
        <div>
          <PrivateRoute path="/user" render={() => <p>user</p>} />
        </div>
      </AuthRouter>
    </MemoryRouter>
  );

describe('AuthRouter, PrivateRoute and PublicRoute', () => {
  test('should be able to go private route if user is logged in', () => {
    const { getByText, getUserLink } = renderAuth({ isAuth: true });
    const userLink = getUserLink();
    fireEvent.click(userLink);
    expect(getByText('user1')).toBeInTheDocument();
  });

  test(`should be redirected to "kickTo" path of PrivateRoute if user isn't logged in`, () => {
    const { getByText, getUserLink, queryByText } = renderAuth({
      isAuth: false
    });

    const userLink = getUserLink();
    fireEvent.click(userLink);
    expect(getByText('island')).toBeInTheDocument();
    expect(queryByText('user1')).not.toBeInTheDocument();
  });

  test(`should be redirected to "privateKickTo" path of AuthRouter if PrivateRoute isn't specified "kickTo"`, () => {
    const { getByText, getUser2Link, queryByText } = renderAuth({
      isAuth: false
    });
    const user2Link = getUser2Link();
    fireEvent.click(user2Link);
    expect(getByText('island all')).toBeInTheDocument();
    expect(queryByText('user2')).not.toBeInTheDocument();
  });

  describe(`PublicRoute`, () => {
    test(`if user isn't logged in, should be able to go public route`, () => {
      const { getByText, getLoginLink } = renderAuth({
        isAuth: false
      });
      const loginLink = getLoginLink();
      fireEvent.click(loginLink);
      expect(getByText('login page')).toBeInTheDocument();
    });

    test(`if user is logged in, shouldn't be able to go public route`, () => {
      const { queryByText, getLoginLink } = renderAuth({
        isAuth: true
      });
      const loginLink = getLoginLink();
      fireEvent.click(loginLink);
      expect(queryByText('login page')).not.toBeInTheDocument();
    });

    test(`if user is logged in, should be redirected to "publicKickTo" path of AuthRouter`, () => {
      const { queryByText, getLoginLink } = renderAuth({
        isAuth: true
      });
      const loginLink = getLoginLink();
      fireEvent.click(loginLink);
      expect(queryByText('island public all')).toBeInTheDocument();
    });

    test(`if user is logged in, should be redirected to "kickTo" path of PublicRoute`, () => {
      const { queryByText, getAboutLink } = renderAuth({
        isAuth: true
      });
      const aboutLink = getAboutLink();
      fireEvent.click(aboutLink);
      expect(queryByText('island public not all')).toBeInTheDocument();
    });
  });

  describe('should be able to go to public', () => {
    test('if user is logged in', () => {
      const { getByText, getHomeLink } = renderAuth({
        isAuth: true
      });
      const homeLink = getHomeLink();
      fireEvent.click(homeLink);
      expect(getByText('home')).toBeInTheDocument();
    });

    test(`if user isn't logged in`, () => {
      const { getByText, getHomeLink } = renderAuth({
        isAuth: false
      });
      const homeLink = getHomeLink();
      fireEvent.click(homeLink);
      expect(getByText('home')).toBeInTheDocument();
    });
  });

  test(`should throw error if "kickTo" of PrivateRoute or "privateKickTo" of AuthRouter isn't provided`, () => {
    const restoreConsole = mockConsole();
    expect(() => {
      renderAuthNoKickTo();
    }).toThrowError(
      'You need to provide "kickTo" prop for PrivateRoute or "privateKickTo" for AuthRouter'
    );
    restoreConsole();
  });

  describe('should be able to handle authorization correctly', () => {
    test(`user can't go to required authorize route if user doesn't have corresponding authorize`, () => {
      const { getManagerLink, getManagerSection } = renderAuthorizes(true, [
        'cleaner'
      ]);
      const managerLink = getManagerLink();

      fireEvent.click(managerLink);

      const managerSection = getManagerSection();

      expect(managerSection).not.toBeInTheDocument();
    });

    test(`user can't go to required authorize route if user have corresponding authorize but have no authentication`, () => {
      const { getManagerLink, getManagerSection } = renderAuthorizes(false, [
        'manager'
      ]);
      const managerLink = getManagerLink();

      fireEvent.click(managerLink);

      const managerSection = getManagerSection();

      expect(managerSection).not.toBeInTheDocument();
    });

    test(`user can go to required authorize route if user have corresponding authorize and have authentication`, () => {
      const { getManagerLink, getManagerSection } = renderAuthorizes(true, [
        'manager'
      ]);
      const managerLink = getManagerLink();

      fireEvent.click(managerLink);

      const managerSection = getManagerSection();

      expect(managerSection).toBeInTheDocument();
    });

    test(`user can have multiple authorizes`, () => {
      const {
        getManagerLink,
        getManagerSection,
        getPoLink,
        getPoSection
      } = renderAuthorizes(true, ['manager', 'po']);
      const managerLink = getManagerLink();
      const poLink = getPoLink();

      fireEvent.click(managerLink);

      const managerSection = getManagerSection();

      expect(managerSection).toBeInTheDocument();

      fireEvent.click(poLink);

      const poSection = getPoSection();

      expect(poSection).toBeInTheDocument();
    });

    describe(`PrivateRoute can have multiple authorizes`, () => {
      test('dev authorize', () => {
        const { getDevLink, getDevSection } = renderAuthorizes(true, ['dev']);
        const devLink = getDevLink();

        fireEvent.click(devLink);

        const devSection = getDevSection();

        expect(devSection).toBeInTheDocument();
      });

      test('admin authorize', () => {
        const { getDevLink, getDevSection } = renderAuthorizes(true, ['admin']);
        const devLink = getDevLink();

        fireEvent.click(devLink);

        const devSection = getDevSection();

        expect(devSection).toBeInTheDocument();
      });
    });
  });

  describe(`should be able to kick user to different route based on invalid authentication or authorization`, () => {
    test('invalid authentication', () => {
      const { getIslandForAuthen, getDevLink } = renderAuthorizes(
        false,
        ['dev'],
        {
          authen: '/islandforauthen'
        }
      );

      const devLink = getDevLink();

      fireEvent.click(devLink);

      const getIslandForAuthenSection = getIslandForAuthen();

      expect(getIslandForAuthenSection).toBeInTheDocument();
    });

    test('invalid authorization', () => {
      const { getIslandForAuthorize, getManagerLink } = renderAuthorizes(
        true,
        ['po'],
        {
          authen: '/islandforauthen',
          authorize: null
        }
      );

      const managerLink = getManagerLink();

      fireEvent.click(managerLink);

      const getIslandForAuthorizeSection = getIslandForAuthorize();

      expect(getIslandForAuthorizeSection).toBeInTheDocument();
    });
  });
});
