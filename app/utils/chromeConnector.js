import { WRITE_DOM, ASK_FOR_BODY } from '../../actions';

const prTitleRegExp = /PR[\s-]\d*[:]*[\s]*/gmi;

const getPRTitle = () => {
  const title = document.querySelector('#pull_request_title') || document.querySelector('[name="issue[title]"]') || {};
  return title.value || '';
};

const parsePRTitle = prTitle => prTitle.replace(prTitleRegExp, '');

const requestToChrome = (payload) => new Promise((resolve, reject) => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      payload,
      response => {
        //There might be no response if we are not in github.com
        if (response && response.ok) {
          resolve();
        } else {
          reject(response.error);
        }
      }
    );
  });
});

export const getTitleFromPr = () =>
  new Promise(resolve => {
    chrome.tabs.executeScript({
      code: `(${getPRTitle})()`
    }, (results) => {
      resolve(parsePRTitle(results[0]));
    });
  });

export const appendMDToPr = mdCode => requestToChrome({ action: WRITE_DOM, payload: mdCode });

export const hasPRBody = () => requestToChrome({ action: ASK_FOR_BODY });

export const getURL = resourceName => chrome.extension.getURL(resourceName);

export default {
  getTitleFromPr,
  appendMDToPr,
  hasPRBody,
  getURL
};