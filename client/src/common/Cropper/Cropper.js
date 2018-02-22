import React, { Component } from 'react';
import 'cropperjs/dist/cropper.min.css';
import _Cropper from 'cropperjs';

const optionProps = [
  'dragMode',
  'aspectRatio',
  'data',
  'crop',
  // unchangeable props start from here
  'viewMode',
  'preview',
  'responsive',
  'restore',
  'checkCrossOrigin',
  'checkOrientation',
  'modal',
  'guides',
  'center',
  'highlight',
  'background',
  'autoCrop',
  'autoCropArea',
  'movable',
  'rotatable',
  'scalable',
  'zoomable',
  'zoomOnTouch',
  'zoomOnWheel',
  'wheelZoomRation',
  'cropBoxMovable',
  'cropBoxResizable',
  'toggleDragModeOnDblclick',
  'minContainerWidth',
  'minContainerHeight',
  'minCanvasWidth',
  'minCanvasHeight',
  'minCropBoxWidth',
  'minCropBoxHeight',
  'ready',
  'cropstart',
  'cropmove',
  'cropend',
  'zoom',
];
export default class Cropper extends Component {
	componentDidMount = () => {
		const options = Object.keys(this.props)
		.filter(propKey => optionProps.indexOf(propKey) !== -1)
		.reduce((prevOptions, propKey) =>
			Object.assign({}, prevOptions, { [propKey]: this.props[propKey] })
			, {});
		let cropper = new _Cropper(this.refs.image, options);
		this.props.cropper = cropper;
	}
	render () {
		return (
			<div className="Cropper">
				<img ref="image" src="https://avatars2.githubusercontent.com/u/23139022?s=460&v=4" alt="avatar"/>
			</div>
		);
	}
}