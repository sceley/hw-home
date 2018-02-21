import React, { Component } from 'react';
import { Row, Col, Card, Icon, Upload, Modal, Button } from 'antd';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default class Avatar extends Component {
	state = {
		imageUrl: '',
		visible: false
	}

	handleSubmit = () => {

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

	handleChange = (e) => {
		this.setState({
			visible: true
		});
		let fs = new FileReader();
		fs.readAsDataURL(e.file.originFileObj);
		fs.onload = () => {
			this.setState({
				imageUrl: fs.result
			});
		}
	}

	crop = () => 　{
		// console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
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
							customRequest={this.handleSubmit}
							beforeUpload={this.beforeUpload}
							onChange={this.handleChange}
						>
							{this.state.imageUrl ? <img src={this.state.imageUrl} alt="" /> : uploadButton}
						</Upload>
						<Modal
							title="上传头像"
							visible={this.state.visible}
							onCancel={this.handleCancel}
							onOk={this.handleOk}
							footer={<Button type="primary">上传图像</Button>}
						>
							<Cropper
								ref='cropper'
								src={this.state.imageUrl}
								style={{ height: 350, width: 350 }}
								aspectRatio={1 / 1}
								guides={false}
								crop={this.crop}
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