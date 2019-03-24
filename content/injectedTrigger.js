import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { requestGIF } from '../app/utils/requestGif';

import { WRITE_DOM } from '../actions';

import { ACTION_RESOLVERS } from './actionResolvers';
import { getPrBodyNodes, getNewCommentNodes } from './getDomComponents';

import InjectedExtension from './InjectedApp';

const CUSTOM_EVENT = 'refresh:gif';

const withParentNode = fn => (parentNode, ...rest) => {
  if (parentNode) {
    fn(parentNode, ...rest);
  }
};

const createTriggerButton = () => {
  const triggerButton = document.createElement('button');
  triggerButton.className = 'btn';
  triggerButton.style.marginRight = '5px';
  triggerButton.innerHTML = 'Find GIF';

  return triggerButton;
};

const createAppWrapper = () => {
  const appWrapper = document.createElement('div');
  appWrapper.style.position = 'absolute';
  appWrapper.style.top = '100%';
  appWrapper.style.right = 0;
  appWrapper.style.zIndex = 9999;

  return appWrapper;
};

const insertTrigger = withParentNode(({ container, targetInput }, { showInput } = {}) => {
  const triggerButton = createTriggerButton();
  const appWrapper = createAppWrapper();

  const triggerButtonDispatcher = newSearch => {
    triggerButton.dispatchEvent(new CustomEvent(CUSTOM_EVENT, { detail: { keyword: newSearch } }));
  };
  const emptyInjectedApp = e => {
    e && e.preventDefault();
    unmountComponentAtNode(appWrapper);
  };
  
  document.addEventListener('click', e => {
    if (appWrapper.innerHTML && !appWrapper.contains(e.target)) {
      emptyInjectedApp(e);
    }
  });

  const renderApp = (e) => {
    e.preventDefault();
    const keyword = e.detail.keyword;
    requestGIF(keyword).then(({ gifUrl, mdCode }) => {
      const injectGIF = () => {
        ACTION_RESOLVERS[WRITE_DOM]({ mdCode, targetInput }, () => emptyInjectedApp());
      };

      render(
        <InjectedExtension
          gifUrl={gifUrl}
          maxWidth={container.clientWidth}
          handleAccept={injectGIF}
          handleRefreshGif={triggerButtonDispatcher}
          handleCancel={emptyInjectedApp}
          showInput={showInput}
        />,
        appWrapper
      );
    });
  };
  triggerButton.addEventListener('click', renderApp);
  triggerButton.addEventListener(CUSTOM_EVENT, renderApp);

  container.appendChild(triggerButton);
  container.appendChild(appWrapper);
});

export const insertTriggers = () => {
  const prBodyNodes = getPrBodyNodes();
  const newCommentNodes = getNewCommentNodes();

  insertTrigger(prBodyNodes);
  insertTrigger(newCommentNodes, { showInput: true });
};

export default {
  insertTriggers
};
