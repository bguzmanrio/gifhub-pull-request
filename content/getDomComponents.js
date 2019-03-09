const TITLE_REG_EXP = /PR[\s-]\d*[:]*[\s]*/gmi;

const parsePRTitle = prTitle => prTitle.replace(TITLE_REG_EXP, '');


export const getPRTitle = () => {
  const title = document.querySelector('#pull_request_title') || document.querySelector('[name="issue[title]"]') || {};
  return parsePRTitle(title.value || '');
};

export const getBody = () => {
  const prBody = document.querySelector('#pull_request_body') || document.querySelector('[name="pull_request[body]"]');
  
  if (!prBody) {
    throw new Error('No body found!');
  }

  return prBody;
};

export const getButtonFooter = () => {
  const prButtonFooter = document.querySelector('.comment-form-actions') || document.querySelector('.form-actions');

  if (!prButtonFooter) {
    throw new Error('No button footer found!');
  }

  return prButtonFooter;
};

export default {
  getPRTitle,
  getBody,
  getButtonFooter
};
