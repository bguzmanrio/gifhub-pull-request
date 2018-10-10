import { WRITE_DOM } from '../actions';

const insertMDCode = mdCode => {
  const prBody = document.querySelector('#pull_request_body');

  if (prBody) {
    const currentValue = prBody.value;
    prBody.value = `${currentValue}\n${mdCode}`;
  } else {
    throw new Error('No body found!');
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === WRITE_DOM) {
    insertMDCode(request.payload);
    sendResponse({ ok: true });
  } else {
    sendResponse({ ok: false });
  }
});