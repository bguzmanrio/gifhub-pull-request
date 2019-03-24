import { WRITE_DOM, ASK_FOR_BODY, ASK_FOR_TITLE } from '../../actions';

const requestToChrome = (payload) => new Promise((resolve, reject) => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      payload,
      response => {
        if (response && response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      }
    );
  });
});

export const appendMDToPr = payload => requestToChrome({ action: WRITE_DOM, payload });

export const hasPRBody = () => requestToChrome({ action: ASK_FOR_BODY });

export const getTitleFromPr = () => requestToChrome({ action: ASK_FOR_TITLE });

export const getURL = resourceName => chrome.extension.getURL(resourceName);

export const openURL = url => chrome.tabs.create({ url });

export default {
  getTitleFromPr,
  appendMDToPr,
  hasPRBody,
  getURL,
  openURL
};