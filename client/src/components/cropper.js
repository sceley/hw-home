import react, { Component } from 'react';
import Cropper from 'cropperjs';

export default class Cropper extends Component {

	state = {
		cropper: ''
	}

	componentDidMount () {
		this.state.cropper = new Cropper(this.refs.img);
		console.log(this.state.cropper.getCroppedCanvas());
	}

	render () {
		return (
				<div className="Cropper">
					<img ref="image" src={this.props.src}/>
				</div>
			);
	}
}