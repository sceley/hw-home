import React, { Component } from 'react';
import { Row, Col, Card, Icon, Upload, Modal, Button } from 'antd';
import Cropper from '../../common/Cropper/Cropper';
import ParseImage from '../../common/ParseImage';

export default class Avatar extends Component {
	state = {
		url: '',
		visible: false
	}

	handleSubmit = (e) => {
		console.log(e);
	}

	beforeUpload = () => {

	}

	handleOk = (e) => {
		this.setState({
			visible: false,
		});
	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
	}

	handleRequest = (e) => {
		console.log(e.file);
		let fs = new FileReader();
		fs.readAsDataURL(e.file);
		fs.onload = () => {
			this.setState({
				url: fs.result
			});
		}
		this.setState({
			visible: true
		});
	}

	handleUpload = () => {
		let canvas = this.refs.cropper.getCroppedCanvas();
		let blob = ParseImage(canvas);
		let body = new FormData();
		body.append('avatar', blob);
		fetch('http://localhost:8080/user/uploadavatar', {
			method: 'POST',
			credentials: 'include',
			body: body
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			console.log(json);
		});
	}
	render() {
		const uploadButton = (
			<div>
				<Icon type='plus' />
				<div className="ant-upload-text">Upload</div>
			</div>
		);

		return (
			<div className="Avatar">
				<Card title={<span><Icon type="picture" 　/>请选择图片</span>}>
					<div>
						<h2>图像</h2>
						<Upload
							name="avatar"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							customRequest={this.handleRequest}
						>
							{this.state.url ? <img src={this.state.url} alt="" /> : uploadButton}
						</Upload>
						<Modal
							width={400}
							title="上传头像"
							visible={this.state.visible}
							onCancel={this.handleCancel}
							onOk={this.handleOk}
							footer={<Button onClick={this.handleUpload} type="primary">上传图像</Button>}
						>
							<Cropper
								ref='cropper'
								url={this.state.url}
								style={{ height: 350, width: 350 }}
								aspectRatio={1 / 1}
								guides={false}
								cropBoxResizable={false}
								minCropBoxWidth={350}
								minCropBoxHeight={350}
							/>
						</Modal>
					</div>
				</Card>
			</div>
		);
	}
}