const prTitleRegExp = /PR[\s-]\d*[:]*[\s]*/gmi;

const getPRTitle = () => {
  const title = document.querySelector('#pull_request_title') || {};
  return title.value || '';
};

const insertMDCode = mdCode => {
  const prBody = document.querySelector('#pull_request_body');

  if (prBody) {
    const currentValue = prBody.value;
    prBody.value = `${currentValue}\n${mdCode}`;
  } else {
    throw new Error('No body found!')
  }
}

const parsePRTitle = prTitle => prTitle.replace(prTitleRegExp, '');

export const getTitleFromPr = () =>
  new Promise(resolve => {
    chrome.tabs.executeScript({
      code: `(${getPRTitle})()`
    }, (results) => {
      resolve(parsePRTitle(results[0]));
    });
  });

export const appendMDToPr = mdCode => 
  new Promise(resolve => {
    chrome.tabs.executeScript({
      code: `(${insertMDCode})(${mdCode})`
    }, () => {
      resolve(true);
    });
  })

export default {
  getTitleFromPr,
  appendMDToPr
};