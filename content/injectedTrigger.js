import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { requestGIF } from '../app/utils/requestGif';

import { WRITE_DOM } from '../actions';

import { ACTION_RESOLVERS } from './actionResolvers';
import { getButtonFooter } from './getDomComponents';

const getInjectedWrapperStyle = maxWidth => ({
  alignItems: 'center',
  backgroundColor: '#fff',
  border: '1px solid #d1d5da',
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
  maxWidth
});

const imgStyle = {
  marginBottom: '5px',
  maxWidth: '100%'
};


const InjectedExtension = ({ gif, handleRefreshGif, handleCancel, maxWidth }) => (
  <div style={getInjectedWrapperStyle(maxWidth)}>
    <img style={imgStyle} src={gif.gifUrl}></img>
    <div className="clearfix">
      <button
        className="btn btn-primary"
        onCLick={e => e.preventDefault() && ACTION_RESOLVERS[WRITE_DOM](gif.mdCode)}
      >
        Let's do it!
      </button>
      <button className="btn btn-danger" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn" onClick={handleRefreshGif}>
        Moar GIF
      </button>
    </div>
  </div>
);

export const insertTrigger = () => {
  const buttonFooter = getButtonFooter();
  const triggerButton = document.createElement('button');
  const appWrapper = document.createElement('div');
  const triggerButtonDispatcher = e => {
    e.preventDefault();
    triggerButton.dispatchEvent(new Event('click'));
  };
  const emptyInjectedApp = e => {
    e.preventDefault();
    unmountComponentAtNode(appWrapper);
  };
  appWrapper.style.position = 'absolute';
  appWrapper.style.top = '100%';
  appWrapper.style.zIndex = 9999;
  triggerButton.addEventListener('click', e => {
    e.preventDefault();
    requestGIF().then(newGif => {
      const maxWidth = buttonFooter.clientWidth;
      appWrapper.style.maxWidth = maxWidth;
      render(
        <InjectedExtension
          maxWidth={maxWidth}
          gif={newGif}
          handleRefreshGif={triggerButtonDispatcher}
          handleCancel={emptyInjectedApp}
        />,
        appWrapper
      );
    })
  })
  triggerButton.className = 'btn';
  triggerButton.innerHTML = 'Have fun!'
  buttonFooter.appendChild(triggerButton);
  buttonFooter.appendChild(appWrapper);
};

export default {
  insertTrigger
};
