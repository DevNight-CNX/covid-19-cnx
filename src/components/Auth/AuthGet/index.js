/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../AuthRouter';

const AuthGetterProps = {
  render: PropTypes.func
};

class AuthGetter extends Component {
  render() {
    const { render } = this.props;
    return (
      <Consumer>
        {({ isAuth, authorizes, isVerifying }) =>
          render({ isAuth, authorizes, isVerifying })
        }
      </Consumer>
    );
  }
}

AuthGetter.propTypes = AuthGetterProps;

export default AuthGetter;
