import React from 'react';
import styled from 'react-emotion';

const CollaborateWrapper = styled('div')`
  text-align: right;
`;

const CollaborateLink = styled('a')`
  font-size: 12px;
  font-weight: 300;
  color: white;
  text-decoration: none;
`;

const Collaborate = () => (
  <CollaborateWrapper>
    <CollaborateLink href="https://github.com/bguzmanrio/pr-gif-extension">Collaborate here</CollaborateLink>
  </CollaborateWrapper>
);

export default Collaborate;