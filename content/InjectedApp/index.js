import React, { useState, useEffect } from 'react';

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

const inputStyle = {
  flexGrow: '1',
  marginRight: '5px'
};

const searchWrapperStyle = {
  display: 'flex',
  marginBottom: '5px',
  width: '100%'
};

const InjectedExtension = ({ handleRefreshGif, handleCancel, handleAccept, maxWidth, prTitle }) => {
  const [inputValue, handleInput] = useState(prTitle);
  const [gifInfo, setGifUrl] = useState({});
  const requestGif = e => {
    e && e.preventDefault();
    handleRefreshGif(inputValue).then(({ gifUrl, mdCode }) => {
      setGifUrl({gifUrl, mdCode});
    });
  };

  useEffect(() => {
    return requestGif();
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      requestGif(e);
    }
  }

  return (
    <div style={getInjectedWrapperStyle(maxWidth)}>
      <div style={searchWrapperStyle}>
        <input
          type="text"
          className="form-control"
          placeholder="Comment with a GIF..."
          style={inputStyle}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={e => handleInput(e.target.value)}
        />
        <button className="btn" onClick={requestGif}>
          Moar GIF
        </button>
      </div>
      <img style={imgStyle} src={gifInfo.gifUrl}></img>
      <div className="clearfix">
        <button
          className="btn btn-primary"
          onClick={() => handleAccept(gifInfo.mdCode)}
        >
          Add GIF
        </button>
        <button className="btn btn-danger" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InjectedExtension;
