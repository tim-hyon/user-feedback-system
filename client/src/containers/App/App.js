import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router5';
import { connect } from 'react-redux';
import { actions, createRouteNodeSelector } from 'redux-router5';
import getColor from 'styles/colors';
import styled from 'styled-components';
import { getUsername } from 'containers/User/UserState';
import {
  Button,
} from 'components';
import {
  Login,
  UserProfile,
  FeedbackPostList,
  FeedbackPostEdit,
} from 'containers';

const DivScMenuLinks = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 1rem;
  border-bottom: 1px solid ${getColor('gray', 70)};
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

const LinkSc = styled(Link)`
  color: ${getColor('gray', 10)};
  text-decoration: none;
`;

const DivScUsername = styled.div`
  margin: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${getColor('gray', 70)};
`;

const DivScLogout = styled.div`
  margin: 0 0.3rem;
`;

const mapStateToProps = state => ({
  ...createRouteNodeSelector('')(state),
  navigateTo: actions.navigateTo,
  username: getUsername(state),
});

class App extends PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    username: PropTypes.string,
  };

  static defaultProps = {
    username: null,
  };

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const {
      username, dispatch, navigateTo, route,
    } = this.props;

    dispatch({ type: 'FETCH_USER_FROM_TOKEN' });

    const routeName = route.name;

    if (!username && routeName !== 'login') {
      dispatch(navigateTo('login', { reload: true }));
    }
  }

  componentDidUpdate() {
    const {
      username, dispatch, navigateTo, route,
    } = this.props;
    const routeName = route.name;

    if (!username && routeName !== 'login') {
      dispatch(navigateTo('login', { reload: true }));
    }
  }

  handleLogout() {
    const { dispatch } = this.props;

    dispatch({ type: 'LOGOUT_USER' });
  }

  render() {
    const { route, username } = this.props;
    const routeName = route.name;

    let container = <div>Unknown Route</div>;

    if (routeName === 'login') {
      container = <Login />;
    } else if (routeName === 'profile') {
      container = <UserProfile />;
    } else if (routeName === 'posts') {
      container = <FeedbackPostList />;
    } else if (routeName === 'posts.edit') {
      container = <FeedbackPostEdit />;
    }

    return (
      <div>
        <DivScMenuLinks onClick={this.handleCloseDrawer}>
          {username ? (
            <Fragment>
              <LinkSc
                routeName="posts"
                routeOptions={{ reload: true }}
              >
                Posts
              </LinkSc>
              <LinkSc
                routeName="profile"
                routeOptions={{ reload: true }}
              >
                Profile
              </LinkSc>
              <DivScUsername>
                {`Currently logged in as: ${username}`}
                <DivScLogout>
                  <Button
                    onClick={this.handleLogout}
                    color="blue"
                    text="Logout"
                  />
                </DivScLogout>
              </DivScUsername>
            </Fragment>
          ) : (
            <LinkSc
              routeName="login"
              routeOptions={{ reload: true }}
            >
              Login
            </LinkSc>
          )}
        </DivScMenuLinks>
        { container }
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
