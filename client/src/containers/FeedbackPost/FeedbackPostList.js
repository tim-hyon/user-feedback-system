import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions, createRouteNodeSelector } from 'redux-router5';
import styled from 'styled-components';
import { getFeedbackPosts } from 'containers/FeedbackPost/FeedbackPostState';
import {
  Button,
  TextInput,
  TextArea,
  FeedbackPost,
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
  feedbackPosts: getFeedbackPosts(state),
});

class FeedbackPostList extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    feedbackPosts: PropTypes.array,
  };

  static defaultProps = {
    feedbackPosts: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      description: '',
    };

    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCreateFeedbackPost = this.handleCreateFeedbackPost.bind(this);
    this.handleDeleteFeedbackPost = this.handleDeleteFeedbackPost.bind(this);
    this.handleEditFeedbackPost = this.handleEditFeedbackPost.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'GET_FEEDBACK_POSTS' });
  }

  handleSubjectChange(e) {
    const { value } = e && e.target;

    this.setState({ subject: value });
  }

  handleDescriptionChange(e) {
    const { value } = e && e.target;

    this.setState({ description: value });
  }

  handleCreateFeedbackPost() {
    const { dispatch } = this.props;
    const { subject, description } = this.state;

    dispatch({
      type: 'CREATE_FEEDBACK',
      data: { subject, description },
    });

    this.setState({ subject: '', description: '' });
  }

  handleEditFeedbackPost(id) {
    const { dispatch, navigateTo } = this.props;

    dispatch(navigateTo('posts.edit', { id }, { reload: true }));
  }

  handleDeleteFeedbackPost(id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'DELETE_FEEDBACK',
      id,
    });
  }


  render() {
    const { feedbackPosts } = this.props;
    const { subject, description } = this.state;

    return (
      <DivScFeedbackPostList>
        <DivScTitle>Create new feedback:</DivScTitle>
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
            onClick={this.handleCreateFeedbackPost}
            disabled={subject === '' || description === ''}
            color="blue"
            text="Create Feedback"
          />
        </DivScButtons>
        <DivScTitle>Previously submitted feedback:</DivScTitle>
        {feedbackPosts.map(post => (
          <FeedbackPost
            key={post._id}
            subject={post.subject}
            description={post.description}
            onEdit={_.partial(this.handleEditFeedbackPost, post._id)}
            onDelete={_.partial(this.handleDeleteFeedbackPost, post._id)}
          />
        ))}
      </DivScFeedbackPostList>
    );
  }
}

export default connect(mapStateToProps)(FeedbackPostList);
