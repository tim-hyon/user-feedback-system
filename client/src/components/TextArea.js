import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextAreaSc = styled.textarea`
  padding: 0.5rem;
  outline: none;
  width: calc(100% - 1rem);
  font-family: Arial;
  height: calc(100% - 1rem - 2px);
  min-height: 3rem;
`;

const DivScTextArea = styled.div`
  width: 100%;
  margin: 0.2rem;
`;

class TextArea extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
  };

  render() {
    const {
      value,
      onChange,
      placeholder,
    } = this.props;

    return (
      <DivScTextArea>
        <TextAreaSc
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={onChange}
        />
      </DivScTextArea>
    );
  }
}

export default TextArea;
