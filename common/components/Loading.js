import React from 'react';

import { getURL } from '../utils/chromeConnector';

import Image from './Image';

const Loading = ({ styles }) => (
  <Image src={getURL('img/loader.gif')} alt="Loading" style={styles} />
);

export default Loading;