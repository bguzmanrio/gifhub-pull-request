import React, { Fragment, useState, useRef } from 'react';

import Button from './Button';

const CopyButton = () => {
  const inputWrapper = React.useRef(null);
  const [copied, setCopy] = React.useState(false);
  

  const handleCopy = () => setCopy(true);

  return (
    <Fragment>
      <Button vertical onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </Button>
      <span ref={inputWrapper} />
    </Fragment>
  )
};

export default CopyButton;