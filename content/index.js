import { ACTION_RESOLVERS } from './actionResolvers';
import { insertTrigger } from './injectedTrigger';

chrome.runtime.onMessage.addListener(function(request, _, sendResponse) {
  const resolver = ACTION_RESOLVERS[request.action] || ACTION_RESOLVERS.default;

  resolver(request.payload, sendResponse, request.action);
});

insertTrigger();
