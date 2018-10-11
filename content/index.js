import { WRITE_DOM, ASK_FOR_BODY } from '../actions';

const getBody = () => {
  const prBody = document.querySelector('#pull_request_body') || document.querySelector('[name="pull_request[body]"]');
  
  if (!prBody) {
    throw new Error('No body found!');
  }

  return prBody;
}

const insertMDCode = mdCode => {
  const prBody = getBody();
  const currentValue = prBody.value;

  prBody.value = `${currentValue}\n${mdCode}`;
}

const ACTION_RESOLVERS = {
  [WRITE_DOM]: (payload, next) => {
    try {
      insertMDCode(payload);
      next({ ok: true });
    } catch (error) {
      next({ ok: false, error });
    }
  },
  [ASK_FOR_BODY]: (_, next) => {
    try {
      getBody();
      next({ ok: true });
    } catch (error) {
      next({ ok: false, error });
    }
  },
  default: (_, next, action) => {
    next({ ok: false, error: `No resolver for action ${action}`});
  }
}

chrome.runtime.onMessage.addListener(function(request, _, sendResponse) {
  const resolver = ACTION_RESOLVERS[request.action] || ACTION_RESOLVERS.default;

  resolver(request.payload, sendResponse, request.action);
});