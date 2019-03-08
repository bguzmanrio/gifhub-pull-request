import styled from '@emotion/styled';

const Block = styled('div')`
  display: flex;
  margin-bottom: 8px;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
`;

export default Block;