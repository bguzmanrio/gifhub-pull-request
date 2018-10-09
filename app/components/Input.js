import styled from 'react-emotion';

const Input = styled('input')`
  padding: 8px;
  border: none;
  border-radius: 4px;
  flex: 1;
  margin-right: ${props => props.vertical ? 0 : '8px'};
  margin-bottom: ${props => props.vertical ? '8px' : 0};
  min-width: 100px;
`;

export default Input;