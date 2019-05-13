import { useState } from 'react';

import { requestGIF } from './requestGif';

export const useImgRequestLoaded = (inputValue) => {
  const [loading, setLoading] = useState(true);
  const [gifInfo, setGifUrl] = useState({});

  const request = e => {
    e && e.preventDefault();
    setLoading(true);
    requestGIF(inputValue).then(({ gifUrl, mdCode }) => {
      const tempImg = new Image();
      tempImg.onload = () => {
        setLoading(false);
        setGifUrl({gifUrl, mdCode});
      };
      tempImg.src = gifUrl;
    });
  };

  return [gifInfo, loading, request];
};

export default {
  useImgRequestLoaded
};
