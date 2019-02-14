import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRouteNodeSelector } from 'redux-router5';
import styled from 'styled-components';
import { getUsername, getLastPasswordChange } from 'containers/User/UserState';
import {
  Button,
  TextInput,
} from 'components';

const DivScProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DivScTitle = styled.div`
  font-size: 1.5em;
  margin: 0.1rem;
`;

const DivScForm = styled.div`
  margin: 1rem;
  width: 50vw;
`;

const DivScButtons = styled.div`
  display: flex;
  width: 10vw;
`;

const mapStateToProps = state => ({
  ...createRouteNodeSelector('')(state),
  lastPasswordChange: getLastPasswordChange(state),
  username: getUsername(state),
});

class Profile extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    username: PropTypes.string,
    lastPasswordChange: PropTypes.string,
  };

  static defaultProps = {
    username: '',
    lastPasswordChange: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      newPassword: '',
      newPasswordConfirmation: '',
      newUsername: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.handlePasswordChangeSubmit = this.handlePasswordChangeSubmit.bind(this);
    this.handleUsernameChangeSubmit = this.handleUsernameChangeSubmit.bind(this);
  }

  handleUsernameChange(e) {
    const { value } = e && e.target;

    this.setState({ newUsername: value });
  }

  handleUsernameChangeSubmit() {
    const { dispatch } = this.props;
    const { newUsername } = this.state;

    dispatch({
      type: 'CHANGE_USERNAME',
      data: { username: newUsername },
    });

    this.setState({ newUsername: '' });
  }

  handlePasswordChange(e) {
    const { value } = e && e.target;

    this.setState({ newPassword: value });
  }

  handlePasswordConfirmationChange(e) {
    const { value } = e && e.target;

    this.setState({ newPasswordConfirmation: value });
  }

  handlePasswordChangeSubmit() {
    const { dispatch } = this.props;
    const { newPassword, newPasswordConfirmation } = this.state;

    dispatch({
      type: 'CHANGE_PASSWORD',
      data: { password: newPassword, confirmPassword: newPasswordConfirmation },
    });

    this.setState({ newPassword: '', newPasswordConfirmation: '' });
  }

  render() {
    const { username, lastPasswordChange } = this.props;
    const { newUsername, newPassword, newPasswordConfirmation } = this.state;

    return (
      <DivScProfile>
        <DivScTitle>User Profile</DivScTitle>
        <DivScForm>
          <div>Change Username</div>
          <div>
            <TextInput placeholder="New Username" onChange={this.handleUsernameChange} value={newUsername} />
          </div>
        </DivScForm>
        <DivScButtons>
          <Button
            onClick={this.handleUsernameChangeSubmit}
            disabled={newUsername === '' || newUsername === username}
            color="green"
            text="Change Username"
          />
        </DivScButtons>
        <DivScForm>
          <div>{`Change Password (last changed on: ${lastPasswordChange})`}</div>
          <div>
            <TextInput placeholder="New Password" onChange={this.handlePasswordChange} value={newPassword} />
          </div>
          <div>
            <TextInput placeholder="Confirm New Password" onChange={this.handlePasswordConfirmationChange} value={newPasswordConfirmation} />
          </div>
        </DivScForm>
        <DivScButtons>
          <Button
            onClick={this.handlePasswordChangeSubmit}
            disabled={newPassword === '' || newPassword !== newPasswordConfirmation}
            color="green"
            text="Change Password"
          />
        </DivScButtons>
      </DivScProfile>
    );
  }
}

export default connect(mapStateToProps)(Profile);
