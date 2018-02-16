import React, { Component } from 'react';

import { Row, Col, Card, Icon, Upload } from 'antd';

import AsideNav from './AsideNav';

export default class Avatar extends Component {
	state = {
		imageUrl: ''
	}

	handleSubmit = () => {

	}

	beforeUpload = () => {

	}

	handleChange = (e) => {
		let fs = new FileReader();
		fs.readAsDataURL(e.file.originFileObj);
		fs.onload = () => {
			this.setState({
				imageUrl: fs.result
			});
		}
	}

	render () {
		const uploadButton = (
			<div>
				<Icon type='plus' />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		return (
				<div className="Avatar">
					<Row gutter={16}>
						<Col span={8}>
							<AsideNav/>
						</Col>
						<Col span={16}>
							<Card title={<span><Icon type="picture"　/>请选择图片</span>}>
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
								</div>
							</Card>
						</Col>
					</Row>
				</div>
			);
	}
}