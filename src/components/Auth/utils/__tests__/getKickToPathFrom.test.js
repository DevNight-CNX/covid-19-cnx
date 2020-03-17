import getKickToPathFrom from '../getKickToPathFrom';

describe('getKickToPathFrom', () => {
  test(`should get kickTo from AuthenRouter if route doesn't provide`, () => {
    const actual = getKickToPathFrom(
      {
        authen: '/authenRouter/islandforauthen'
      },
      {},
      {
        isAuth: false
      }
    );

    expect(actual).toBe('/authenRouter/islandforauthen');
  });

  test(`should get kickTo from route if both AuthenRouter and route provide`, () => {
    const actual = getKickToPathFrom(
      {
        authen: '/authenRouter/islandforauthen'
      },
      {
        authen: '/route/islandforauthen'
      },
      {
        isAuth: false
      }
    );

    expect(actual).toBe('/route/islandforauthen');
  });
});
