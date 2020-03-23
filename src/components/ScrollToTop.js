import { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.any,
    isEnabled: PropTypes.bool
  };

  static defaultProps = {
    isEnabled: true
  };

  componentDidUpdate(prevProps) {
    const { isEnabled, location } = this.props;
    if (location !== prevProps.location && isEnabled) {
      if (window.innerWidth <= 1100) {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default compose(withRouter)(ScrollToTop);
