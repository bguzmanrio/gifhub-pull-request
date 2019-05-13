import React from 'react';

const Image = ({ style = {}, ...restProps }) => <img {...restProps} style={{ margin: 'auto', ...style }}/>

export default Image;
