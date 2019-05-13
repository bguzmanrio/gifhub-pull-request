import React from 'react';

import { getURL } from '../../common/utils/chromeConnector';

const Sponsor = () => (
  <img src={getURL('img/giphy_logo.gif')} alt="Powered by Giphy" style={{ maxWidth: '150px'}} />
);

export default Sponsor;