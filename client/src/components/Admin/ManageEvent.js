import React, { Component } from 'react';
import { Button, Input, Upload, Icon, Modal } from 'antd';
import Editor from '../../common/Editor/Editor';
import Cropper from '../../common/Cropper/Cropper';
import ParseImage from '../../common/ParseImage';
import config from '../../config';

export default class CreateArticleForm extends Component {
	state = {
		visible: false,
		src: '',
		url: ''

	}

	handleCancel = () => {
		this.setState({
			visible: false
		});
	}

	handleChange = (e) => {
		let fs = new FileReader();
		fs.readAsDataURL(e.file);
		fs.onload = () => {
			this.setState({
				src: fs.result
			});
		}
		this.setState({
			visible: true
		});
	}

	handleUpload = () => {
		if (this.state.url) {
			return 0;
		}
		let canvas = this.refs.cropper.getCroppedCanvas();
		let blob = ParseImage(canvas);
		let body = new FormData();
		body.append('image', blob);
		fetch('http://localhost:8080/user/upload', {
			method: 'POST',
			credentials: 'include',
			body: body
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					url: json.url,
					visible: false
				});
			}
		});
	}

	handleSubmit = () => {
		let Title = this.refs.input.input.value;
		let Body = this.refs.editor.getValue();
		fetch(`${config.server}/event/create`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				Poster: this.state.url,
				Body: Body,
				Title: Title
			})
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.props.history.push('/event');
			}
		});
	}

	render() {
		return (
			<div className="ManageEvent">
				<h1 style={{ textAlign: 'center' }}>发布事件</h1>
				<div>
					<div style={{ marginBottom: '5px' }}>标题: </div>

					<Input ref="input" placeholder="请填写标题" />
				</div>
				<div>
					<div style={{ marginBottom: '5px' }}>封面: </div>
					<Upload
						customRequest={this.handleChange}
						accept="image"
						showUploadList={false}
					>
						<Button>
							<Icon type="upload" /> 上传封面
									</Button>
						<div style={{ marginTop: '10px' }}>
							{
								this.state.url ? <img className="poster" src={this.state.url} alt="img" /> : null
							}
						</div>
					</Upload>
					<Modal
						title="上传封面"
						visible={this.state.visible}
						onCancel={this.handleCancel}
						footer={
							<div style={{ textAlign: 'center' }}>
								<Button onClick={this.handleUpload} type="primary">上传封面</Button>
							</div>
						}
					>
						<Cropper
							ref="cropper"
							src={this.state.src}
							aspectRatio={5 / 4}
							cropBoxResizable={false}
							minCropBoxWidth={472}
							zoomable={false}
						/>
					</Modal>
				</div>
				<div>
					<div style={{ marginBottom: '5px' }}>正文: </div>
					<Editor ref="editor" />
				</div>
				<div style={{ textAlign: 'center', marginTop: '20px' }}>
					<Button onClick={this.handleSubmit} type="primary">提交</Button>
				</div>
			</div>
		);
	}
};