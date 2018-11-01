import styled from 'react-emotion';

const Button = styled('button')`
  background: #F64C72;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  flex: 0;
  font-weight: 300;
  margin-bottom: ${props => props.vertical ? '8px' : 0};
  min-width: 110px;
  padding: 8px 16px;

  &:active {
    background: #553D67;
  }
`;

export default Button;