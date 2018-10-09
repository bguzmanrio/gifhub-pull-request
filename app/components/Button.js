import styled from 'react-emotion';

const Button = styled('button')`
  background: #01af24;
  border: none;
  border-radius: 4px;
  color: white;
  flex: 0;
  margin-bottom: ${props => props.vertical ? '8px' : 0};
  padding: 8px 16px;
`;

export default Button;