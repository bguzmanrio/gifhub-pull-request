import React, { Fragment } from 'react';

import Loading from './Loading';
import Image from './Image';

const LoadingImage = ({ isLoaded, handleImageLoad, imgSrc, imgStyle = {}, loadingStyle = {} }) => {
  const loadingStyles = { display: isLoaded ? 'none' : 'block', ...loadingStyle };
  const imageStyles = { display: isLoaded ? 'block' : 'none', ...imgStyle };
  
  return (
    <Fragment>
      <Loading styles={loadingStyles} />
      <Image style={imageStyles} src={imgSrc} onLoad={handleImageLoad}/>
    </Fragment>
  );
};

export default LoadingImage;
