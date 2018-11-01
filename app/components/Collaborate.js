import React from 'react';
import styled from 'react-emotion';

import { openURL } from '../utils/chromeConnector';

const GITHUB_URL = 'https://github.com/bguzmanrio/pr-gif-extension';

const handleOpen = () => {
  openURL(GITHUB_URL);
}

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
    <CollaborateLink onClick={handleOpen} href="https://github.com/bguzmanrio/pr-gif-extension">Collaborate here</CollaborateLink>
  </CollaborateWrapper>
);

export default Collaborate;