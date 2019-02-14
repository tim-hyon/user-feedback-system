import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'components';
import getColor from 'styles/colors';

const DivScFeedbackPost = styled.div`
  border: 1px solid ${getColor('gray', 80)};
  background: ${getColor('blue', 95)};
  border-radius: 3px;
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items; flex-start;
  width: 40rem;
  max-width: 50vw;
`;

const DivScSubject = styled.div`
  font-size: 1.5em;
  margin-bottom: 0.5rem;
`;

const DivScDescription = styled.div`
  font-size: 0.8em;
  margin-bottom: 0.5rem;
`;

const DivScButtons = styled.div`
  display: flex;
  width: 10vw;
`;

const FeedbackPost = ({
  subject, description, onEdit, onDelete,
}) => (
  <DivScFeedbackPost>
    <DivScSubject>
      {subject}
    </DivScSubject>
    <DivScDescription>
      {description}
    </DivScDescription>
    <DivScButtons>
      <Button
        onClick={onEdit}
        color="blue"
        text="Edit"
      />
      <Button
        onClick={onDelete}
        color="red"
        text="Delete"
      />
    </DivScButtons>
  </DivScFeedbackPost>
);

FeedbackPost.propTypes = {
  subject: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FeedbackPost;
