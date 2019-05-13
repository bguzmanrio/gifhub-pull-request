import React from 'react';
import styled from '@emotion/styled';

import { openURL } from '../../common/utils/chromeConnector';

import Button from './Button';

const GITHUB_URL = 'https://github.com/bguzmanrio/pr-gif-extension';

const handleOpen = () => {
  openURL(GITHUB_URL);
}

const CollaborateWrapper = styled('div')`
  text-align: right;
`;

const CollaborateLink = styled('a')`
  font-size: 12px;
  font-weight: 400;
  color: white;
  text-decoration: none;
`;

const Collaborate = () => (
  <CollaborateWrapper>
    <Button onClick={handleOpen}>Collaborate here</Button>
  </CollaborateWrapper>
);

export default Collaborate;