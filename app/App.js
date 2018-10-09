import React, { Component, Fragment } from 'react';

class App extends Component {

	constructor() {
		super();
		this.state = {
			gifUrl: null,
			keyword: null,
			copied: false
		};

		this.mdCodeRef = React.createRef();
		this.handleGifRequest = this.handleGifRequest.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleMDCopy = this.handleMDCopy.bind(this);
	}

	handleGifRequest() {
		const keyParam = 'api_key=VwV9rz5sgKf0uBViFwBlU9b8H3lmossH';
		const params = this.state.keyword ? `tag=${this.state.keyword}&${keyParam}` : keyParam;
		fetch(`https://api.giphy.com/v1/gifs/random?${params}`).then(res => res.json()).then(response => {
			this.setState({
				gifUrl: response.data.image_url
			});
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

		return (
			<div>
				<h1>GIFPRS</h1>
				<input type="text" onChange={this.handleInputChange}></input>
				<button onClick={this.handleGifRequest}>Get the gif!</button>
				{this.state.gifUrl && (
					<Fragment>
						<img src={this.state.gifUrl} />
						<input ref={this.mdCodeRef} type="text" defaultValue={`![](${this.state.gifUrl}`} readOnly />
						<button onClick={this.handleMDCopy}>{this.state.copied ? 'Copied!' : 'Copy'}</button>
					</Fragment>
				)}
				
			</div>
		)
	}
}

export default App;