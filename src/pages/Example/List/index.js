import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import routeUrlProvider, {
  EXAMPLE_COUNTER,
  EXAMPLE_GITHUB_USER_LIST,
  EXAMPLE_TODO_LIST,
  EXAMPLE_FINAL_FORM
} from 'constants/route-paths';
import { List } from '../components';

class ListContainer extends Component {
  static propTypes = {
    match: PropTypes.object
  };

  items = [
    {
      title: 'Todo List',
      description: 'implement todo list with redux',
      linkTo: routeUrlProvider.getForLink(EXAMPLE_TODO_LIST)
    },
    {
      title: 'Github User List',
      description: 'implement user list of github with redux',
      linkTo: routeUrlProvider.getForLink(EXAMPLE_GITHUB_USER_LIST)
    },
    {
      title: 'Counter',
      description: 'implement counter with redux',
      linkTo: routeUrlProvider.getForLink(EXAMPLE_COUNTER)
    },
    {
      title: 'Final Form',
      description: 'implement final form',
      linkTo: routeUrlProvider.getForLink(EXAMPLE_FINAL_FORM)
    }
  ];

  getItems = () => {
    const { match } = this.props;
    return this.items.map(item => {
      return {
        ...item,
        linkTo: `${match.path}${item.linkTo}`
      };
    });
  };

  render() {
    return <List items={this.getItems()} />;
  }
}

export default withRouter(ListContainer);
