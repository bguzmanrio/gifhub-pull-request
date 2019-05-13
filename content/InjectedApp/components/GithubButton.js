import React from 'react';

const CLASSNAMES = {
  primary: 'btn-primary',
  danger: 'btn-danger'
};

const TEXT = {
  default: 'Moar GIF',
  primary: 'Add GIF',
  danger: 'Cancel'
};

const getClassname = action => `btn ${CLASSNAMES[action] || ''}`;

const getText = action => TEXT[action] || TEXT.default;

const GithubButton = ({ action, onClick }) => (
  <button className={getClassname(action)} onClick={onClick}>
    {getText(action)}
  </button>
);

export default GithubButton;