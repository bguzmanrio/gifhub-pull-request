import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { requestGIF } from '../app/utils/requestGif';

import { WRITE_DOM } from '../actions';

import { ACTION_RESOLVERS } from './actionResolvers';
import { getButtonFooter } from './getDomComponents';

const MAX_WIDTH_ALLOWED = 350;

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

const InjectedExtension = ({ gif, handleRefreshGif, handleCancel, maxWidth }) => (
  <div style={getInjectedWrapperStyle(maxWidth)}>
    <img style={imgStyle} src={gif.gifUrl}></img>
    <div className="clearfix">
      <button
        className="btn btn-primary"
        onClick={e => {
          e.preventDefault();
          ACTION_RESOLVERS[WRITE_DOM](gif.mdCode, () => {})
        }}
      >
        Add GIF
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
  appWrapper.style.right = 0;
  appWrapper.style.zIndex = 9999;
  document.addEventListener('click', e => {
    if (appWrapper.innerHTML && !appWrapper.contains(e.target)) {
      emptyInjectedApp(e);
    }
  });
  triggerButton.addEventListener('click', e => {
    e.preventDefault();
    requestGIF().then(newGif => {
      render(
        <InjectedExtension
          maxWidth={buttonFooter.clientWidth}
          gif={newGif}
          handleRefreshGif={triggerButtonDispatcher}
          handleCancel={emptyInjectedApp}
        />,
        appWrapper
      );
    })
  })
  triggerButton.className = 'btn';
  triggerButton.style.marginRight = '5px';
  triggerButton.innerHTML = 'Find GIF'
  buttonFooter.appendChild(triggerButton);
  buttonFooter.appendChild(appWrapper);
};

export default {
  insertTrigger
};
