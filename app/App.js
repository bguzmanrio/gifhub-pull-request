import React, { Component, Fragment } from 'react';

const prTitleRegExp = /PR[\s-]\d*[:]*[\s]*/gmi;

function getPRTitle() {
	const title = document.querySelector('#pull_request_title') || {};
	return title.value || '';
}

const parsePRTitle = prTitle => prTitle.replace(prTitleRegExp, '');

class App extends Component {
	constructor() {
		super();
		this.state = {
			gifUrl: null,
			keyword: null,
			copied: false,
			isLoaded: false
		};

		this.mdCodeRef = React.createRef();
		this.handleImageLoad = this.handleImageLoad.bind(this);
		this.handleGifRequest = this.handleGifRequest.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleMDCopy = this.handleMDCopy.bind(this);
	}

	componentDidMount() {
		chrome.tabs.executeScript({
				code: '(' + getPRTitle + ')();' //argument here is a string but function.toString() returns function's code
		}, (results) => {
				//Here we have just the innerHTML and not DOM structure
				this.setState({
					keyword: parsePRTitle(results[0])
				}, this.handleGifRequest);
		});
	}

	handleGifRequest() {
		const keyParam = 'api_key=VwV9rz5sgKf0uBViFwBlU9b8H3lmossH';
		const params = this.state.keyword ? `tag=${this.state.keyword}&${keyParam}` : keyParam;

		this.setState({
			isLoaded: false
		}, () => {
			fetch(`https://api.giphy.com/v1/gifs/random?${params}`).then(res => res.json()).then(response => {
				this.setState({
					gifUrl: response.data.images.downsized_large.url
				});
			})
		})
	}

	handleImageLoad() {
		this.setState({
			isLoaded: true
		})
	}

	handleInputChange(e) {
		this.setState({
			keyword: e.target.value
		});
	}

	handleMDCopy() {
		this.mdCodeRef.current.select();
		document.execCommand('copy');
		this.setState({
			copied: true
		});
	}

	render() {
		const imgStyles = {
			display: this.state.isLoaded ? 'block' : 'none'
		};

		return (
			<div style={{minWidth: '250px'}}>
				<h1>GIFPRS -- GIFs on demand!</h1>
				<input type="text" onChange={this.handleInputChange} defaultValue={this.state.keyword}></input>
				<button onClick={this.handleGifRequest}>Get the gif!</button>
				{this.state.gifUrl && (
					<Fragment>
						{!this.state.isLoaded && (
							<div>Loading GIF...</div>
            )}
            <div style={imgStyles}>
              <img src={this.state.gifUrl} onLoad={this.handleImageLoad}/>
              <div>
                <input ref={this.mdCodeRef} type="text" defaultValue={`![](${this.state.gifUrl})`} readOnly />
                <button onClick={this.handleMDCopy}>{this.state.copied ? 'Copied!' : 'Copy'}</button>
              </div>
            </div>
					</Fragment>
				)}
				
			</div>
		)
	}
}

export default App;