import React, { Fragment } from 'react';

import Button from './Button';

class CopyButton extends React.Component {
  constructor(){
    super();

    this.state = {
      copied: false
    };

    this.inputWrapperRef = React.createRef();

    this.handleCopy = this.handleCopy.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.url !== this.props.url) {
      this.setState({ copied: false });
    }
  }

  handleCopy() {
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'text';
    hiddenInput.style.height = '0px';
    hiddenInput.style.opacity = '0';
    hiddenInput.value = this.props.url;
    this.inputWrapperRef.current.appendChild(hiddenInput);
    hiddenInput.select();
    document.execCommand('copy');
    this.setState({
      copied: true
    });

    this.inputWrapperRef.current.innerHTML = '';
  }

  render() {
    return (
      <Fragment>
        <Button vertical onClick={this.handleCopy}>
          {this.state.copied ? this.props.copiedText : this.props.copyText}
        </Button>
        <span ref={this.inputWrapperRef} />
      </Fragment>
    );
  }
}

export default CopyButton;