import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getColor from 'styles/colors';

const DivScButtonBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  margin: 0.2rem;
  padding: 0.4rem;
  background: none;
  border: none;
  border-radius: 2px;
  cursor: ${props => (props.disabled ? 'pointer' : 'default')};
`;

const DivScButton = styled(DivScButtonBase)`
  background: ${props => getColor(props.color, 40)};
  color: ${getColor('gray', 90)};

  &:hover {
    background: ${props => getColor(props.color, 30)};
  }

  &:active {
    background: ${props => getColor(props.color, 20)};
  }
`;

const DivScButtonDisabled = styled(DivScButtonBase)`
  background: ${getColor('gray', 70)};
  color: ${getColor('gray', 90)};
`;

class Button extends PureComponent {
  static propTypes = {
    color: PropTypes.oneOf(['red', 'blue', 'green']),
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    color: 'blue',
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const { onClick, disabled } = this.props;

    if (!disabled) {
      onClick();
    }
  }

  render() {
    const { text, disabled, color } = this.props;

    const ButtonDiv = disabled ? DivScButtonDisabled : DivScButton;

    return (
      <ButtonDiv disabled color={color} onClick={this.handleButtonClick}>
        <div>{text}</div>
      </ButtonDiv>
    );
  }
}

export default Button;
