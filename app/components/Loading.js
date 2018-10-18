import React from 'react';

import { getURL } from '../utils/chromeConnector';

const getStyles = isLoaded => ({
  display: isLoaded ? 'none' : 'block',
  margin: 'auto'
});

const Loading = ({ isLoaded }) => (
  <img src={getURL('img/loader.gif')} alt="Loading" style={getStyles(isLoaded)} />
);

export default Loading;