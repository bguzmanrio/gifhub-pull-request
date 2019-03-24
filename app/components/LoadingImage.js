import React, { Fragment } from 'react';

import Loading from './Loading';
import Image from './Image';

const LoadingImage = ({ isLoaded, handleImageLoad, imgSrc }) => {
  const loadingStyles = { display: isLoaded ? 'none' : 'block'};
  const imageStyles = { display: isLoaded ? 'block' : 'none'};
  
  return (
    <Fragment>
      <Loading styles={loadingStyles} />
      <Image style={imageStyles} src={imgSrc} onLoad={handleImageLoad}/>
    </Fragment>
  );
};

export default LoadingImage;
