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
		this.cropper = new _Cropper(this.refs.image, options);
	}
	getCroppedCanvas = () => {
		return this.cropper.getCroppedCanvas();
	}
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.url !== this.props.url) {
          this.cropper.reset().clear().replace(nextProps.url);
        }
    }
	render () {
		return (
			<div className="Cropper">
				<img ref="image" src={this.props.url} alt="avatar"/>
			</div>
		);
	}
}