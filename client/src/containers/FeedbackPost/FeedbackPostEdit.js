import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions, createRouteNodeSelector } from 'redux-router5';
import styled from 'styled-components';
import { getFeedbackPost } from 'containers/FeedbackPost/FeedbackPostState';
import {
  Button,
  TextInput,
  TextArea,
} from 'components';

const DivScFeedbackPostList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DivScForm = styled.div`
  margin: 1rem;
  width: 50vw;
`;

const DivScTitle = styled.div`
  font-size: 1.5em;
  margin: 0.1rem;
  margin-top: 4rem;
`;

const DivScButtons = styled.div`
  display: flex;
  width: 10vw;
`;

const mapStateToProps = state => ({
  ...createRouteNodeSelector('')(state),
  navigateTo: actions.navigateTo,
  feedbackPost: getFeedbackPost(state),
});

class FeedbackPostEdit extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    feedbackPost: PropTypes.object,
  };

  static defaultProps = {
    feedbackPost: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      description: '',
    };

    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { dispatch, route } = this.props;

    dispatch({ type: 'GET_FEEDBACK_POST', id: route.params.id });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { feedbackPostId } = prevState;
    const { feedbackPost } = nextProps;

    if (feedbackPost && feedbackPost._id && feedbackPost._id !== feedbackPostId) {
      return {
        subject: feedbackPost.subject,
        description: feedbackPost.description,
        feedbackPostId: feedbackPost._id,
      };
    }

    if (!feedbackPost || !feedbackPost._id) {
      return {
        subject: '',
        description: '',
        feedbackPostId: null,
      };
    }

    return null;
  }

  handleSubjectChange(e) {
    const { value } = e && e.target;

    this.setState({ subject: value });
  }

  handleDescriptionChange(e) {
    const { value } = e && e.target;

    this.setState({ description: value });
  }

  handleSave() {
    const { dispatch, navigateTo, route } = this.props;
    const { subject, description } = this.state;

    dispatch({
      type: 'UPDATE_FEEDBACK',
      id: route.params.id,
      data: { subject, description },
    });

    this.setState({
      subject: '',
      description: '',
      feedbackPostId: null,
    });

    dispatch(navigateTo('posts', { reload: true }));
  }

  handleCancel() {
    const { dispatch, navigateTo } = this.props;

    this.setState({
      subject: '',
      description: '',
      feedbackPostId: null,
    });

    dispatch(navigateTo('posts', { reload: true }));
  }

  render() {
    const { feedbackPost } = this.props;
    const { subject, description } = this.state;
    const noChangesMade = subject === feedbackPost.subject
      && description === feedbackPost.description;

    return (
      <DivScFeedbackPostList>
        <DivScTitle>Edit your feedback:</DivScTitle>
        <DivScForm>
          <div>
            <TextInput placeholder="Subject" onChange={this.handleSubjectChange} value={subject} />
          </div>
          <div>
            <TextArea placeholder="Description" onChange={this.handleDescriptionChange} value={description} />
          </div>
        </DivScForm>
        <DivScButtons>
          <Button
            onClick={this.handleSave}
            disabled={subject === '' || description === '' || noChangesMade}
            color="blue"
            text="Save"
          />
          <Button
            onClick={this.handleCancel}
            color="red"
            text="Cancel"
          />
        </DivScButtons>
      </DivScFeedbackPostList>
    );
  }
}

export default connect(mapStateToProps)(FeedbackPostEdit);
