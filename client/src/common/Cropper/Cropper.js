import React, { Component } from 'react';
import 'cropperjs/dist/cropper.min.css';
import _Cropper from 'cropperjs';

export default class Cropper extends Component {
	componentDidMount = () => {
		let cropper = new _Cropper(this.refs.image, {
			aspectRatio: 16 / 9,
			crop: function(e) {
				console.log(e.detail.x);
				console.log(e.detail.y);
				console.log(e.detail.width);
				console.log(e.detail.height);
				console.log(e.detail.rotate);
				console.log(e.detail.scaleX);
				console.log(e.detail.scaleY);
			}
		});
	}
	render () {
		return (
			<div className="Cropper">
				<img ref="image" src="https://avatars2.githubusercontent.com/u/23139022?s=460&v=4" alt="avatar"/>
			</div>
		);
	}
}