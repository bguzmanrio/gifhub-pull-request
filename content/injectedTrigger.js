import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { requestGIF } from '../common/utils/requestGif';

import { WRITE_DOM } from '../actions';

import { ACTION_RESOLVERS } from './actionResolvers';
import { getPrBodyNodes, getNewCommentNodes, shouldPrependMainTrigger, getPRTitle } from './getDomComponents';

import InjectedExtension from './InjectedApp';

const withParentNode = fn => ({ container, targetInput }, ...rest) => {
  if (container && targetInput) {
    fn({ container, targetInput }, ...rest);
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

const insertTrigger = withParentNode(({ container, targetInput }, { prTitle, prepend } = {}) => {
  const triggerButton = createTriggerButton();
  const appWrapper = createAppWrapper();

  const emptyInjectedApp = e => {
    e && e.preventDefault();

    unmountComponentAtNode(appWrapper);
  };
  
  document.addEventListener('click', e => {
    if (appWrapper.innerHTML && !appWrapper.contains(e.target) && triggerButton !== e.target) {
      emptyInjectedApp(e);
    }
  });

  const renderApp = (e) => {
    e.preventDefault();
    const injectGIF = mdCode => {
      ACTION_RESOLVERS[WRITE_DOM]({ mdCode, targetInput }, () => emptyInjectedApp());
    };

    render(
      <InjectedExtension
        maxWidth={container.clientWidth}
        handleAccept={injectGIF}
        handleRefreshGif={requestGIF}
        handleCancel={emptyInjectedApp}
        prTitle={prTitle}
      />,
      appWrapper
    );
  };
  
  triggerButton.addEventListener('click', renderApp);

  if (prepend) {
    container.prepend(triggerButton);
  } else {
    container.appendChild(triggerButton);
  }
  container.appendChild(appWrapper);
});

export const insertTriggers = () => {
  const prBodyNodes = getPrBodyNodes();
  const newCommentNodes = getNewCommentNodes();

  insertTrigger(prBodyNodes, { prTitle: getPRTitle(), prepend: shouldPrependMainTrigger() });
  insertTrigger(newCommentNodes);
};

export default {
  insertTriggers
};
