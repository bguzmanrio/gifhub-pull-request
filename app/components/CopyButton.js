import React, { Fragment, useEffect } from 'react';

import Button from './Button';

const copyUrl = (url, parentNode) => {
  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'text';
  hiddenInput.style.height = '0px';
  hiddenInput.style.opacity = '0';
  hiddenInput.value = url;
  parentNode.appendChild(hiddenInput);
  hiddenInput.select();
  document.execCommand('copy');
  parentNode.innerHTML = '';
};

const CopyButtonHook = props => {
  const inputWrapper = React.useRef(null);
  const [copied, setCopy] = React.useState(false);

  useEffect(() => {
    setCopy(false);
  }, [props.url]);

  const handleCopy = () => {
    copyUrl(props.url, inputWrapper.current);
    setCopy(true);
  };

  return (
    <Fragment>
      <Button vertical onClick={handleCopy}>
        {copied ? props.copiedText : props.copyText}
      </Button>
      <span ref={inputWrapper} />
    </Fragment>
  )
};

export default CopyButtonHook;