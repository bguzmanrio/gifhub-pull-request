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

export const getPrBodyNodes = () => {
  const prButtonFooter = document.querySelector('.comment-form-actions') || document.querySelector('.form-actions');

  if (!prButtonFooter) {
    console.log('No button footer found!');
  }

  return {
    container: prButtonFooter,
    targetInput: getBody()
  };
};

export const getNewCommentNodes = () => {
  const commentFooter = document.querySelector('.js-new-comment-form .timeline-comment .form-actions');
  const targetInput = document.querySelector('#new_comment_field');

  if (!commentFooter) {
    console.log('No comment footer found!');
  }

  return {
    container: commentFooter,
    targetInput
  };
};

export default {
  getPRTitle,
  getBody,
  getPrBodyNodes,
  getNewCommentNodes
};
