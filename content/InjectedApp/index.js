import React, { useState, useEffect } from 'react';

import { useImgRequestLoaded } from '../../common/utils/use-img-request-loaded';
import LoadingImage from '../../common/components/LoadingImage';

import Input from './components/Input';
import GithubButton from './components/GithubButton';

const MAX_WIDTH_ALLOWED = 350;
const ENTER_KEY_CODE = 13;

const getMaxWidth = maxWidth => Math.min(MAX_WIDTH_ALLOWED, maxWidth);

const getInjectedWrapperStyle = maxWidth => ({
  alignItems: 'center',
  backgroundColor: '#fff',
  border: '1px solid #d1d5da',
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
  maxWidth: getMaxWidth(maxWidth)
});

const imgStyle = {
  marginBottom: '5px',
  maxWidth: '100%'
};

const searchWrapperStyle = {
  display: 'flex',
  marginBottom: '5px',
  width: '100%'
};

const InjectedExtension = ({ handleCancel, handleAccept, maxWidth, prTitle }) => {
  const [inputValue, handleInput] = useState(prTitle);
  const [gifInfo, loading, request] = useImgRequestLoaded(inputValue);

  useEffect(() => {
    return request();
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      request(e);
    }
  };

  return (
    <div style={getInjectedWrapperStyle(maxWidth)}>
      <div style={searchWrapperStyle}>
        <Input
          inputValue={inputValue}
          handleKeyDown={handleKeyDown}
          handleInput={handleInput}
        />
        <GithubButton onClick={request} />
      </div>
      <LoadingImage
        isLoaded={!loading}
        imgSrc={gifInfo.gifUrl}
        imgStyle={imgStyle}
        loadingStyle={{ marginBottom: '5px', borderRadius: '50%' }}
      />
      <div className="clearfix">
        <GithubButton action="primary" onClick={() => handleAccept(gifInfo.mdCode)} />
        <GithubButton action="danger" onClick={handleCancel} />
      </div>
    </div>
  );
};

export default InjectedExtension;
