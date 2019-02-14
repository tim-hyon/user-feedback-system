import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions, createRouteNodeSelector } from 'redux-router5';
import styled from 'styled-components';
import { getUsername } from 'containers/User/UserState';
import {
  Button,
  TextInput,
} from 'components';

const DivScLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DivScLoginForm = styled.div`
  margin: 1rem;
  width: 50vw;
`;

const DivScTitle = styled.div`
  font-size: 1.5em;
  margin: 0.1rem;
`;

const DivScSubTitle = styled.div`
  font-size: 0.8rem;
  margin: 0.1rem;
`;

const DivScButtons = styled.div`
  display: flex;
  width: 10vw;
`;

const mapStateToProps = state => ({
  ...createRouteNodeSelector('')(state),
  navigateTo: actions.navigateTo,
  username: getUsername(state),
});

class Login extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    username: PropTypes.string,
  };

  static defaultProps = {
    username: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
  }

  componentDidUpdate() {
    const { username, dispatch, navigateTo } = this.props;

    if (username && username.length) {
      dispatch(navigateTo('posts', { reload: true }));
    }
  }

  handleUsernameChange(e) {
    const { value } = e && e.target;

    this.setState({ username: value });
  }

  handlePasswordChange(e) {
    const { value } = e && e.target;

    this.setState({ password: value });
  }

  handleLoginUser() {
    const { dispatch, navigateTo } = this.props;
    const { username, password } = this.state;

    dispatch({
      type: 'LOGIN_USER',
      data: { username, password },
    });
    dispatch(navigateTo('posts', { reload: true }));
  }

  handleCreateUser() {
    const { dispatch, navigateTo } = this.props;
    const { username, password } = this.state;

    dispatch({
      type: 'CREATE_USER',
      data: { username, password },
    });
    dispatch(navigateTo('posts', { reload: true }));
  }

  render() {
    const { username, password } = this.state;

    return (
      <DivScLogin>
        <DivScTitle>Welcome to the User Feedback System</DivScTitle>
        <DivScSubTitle>Enter your username and password below to login</DivScSubTitle>
        <DivScLoginForm>
          <div>
            <TextInput placeholder="Username" onChange={this.handleUsernameChange} value={username} />
          </div>
          <div>
            <TextInput placeholder="Password" onChange={this.handlePasswordChange} value={password} />
          </div>
        </DivScLoginForm>
        <DivScButtons>
          <Button
            onClick={this.handleLoginUser}
            disabled={username === '' || password === ''}
            color="green"
            text="Login"
          />
          <Button
            onClick={this.handleCreateUser}
            disabled={username === '' || password === ''}
            color="blue"
            text="Create User"
          />
        </DivScButtons>
      </DivScLogin>
    );
  }
}

export default connect(mapStateToProps)(Login);
