import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputSc = styled.input`
  padding: 0.5rem;
  outline: none;
  width: calc(100% - 1rem - 4px);
`;

const DivScInput = styled.div`
  width: 100%;
  margin: 0.2rem;
`;

class TextInput extends PureComponent {
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
      <DivScInput>
        <InputSc
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={onChange}
        />
      </DivScInput>
    );
  }
}


export default TextInput;
