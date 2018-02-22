import React, { Component } from 'react';
import { Button, Input, Upload, Icon, Select, Modal } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import Editor from '../../common/Editor/Editor';
import Cropper from '../../common/Cropper/Cropper';
import './CreateArticle.css';

const Option = Select.Option;

export default class CreateArticle extends Component {

	state = {
		visible: false,
		url: ''
	}

	handleCancel = () => {
		this.setState({
			visible: false
		});
	}

	handleSubmit = () => {

	}

	handleChange = (e) => {
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

	componentDidMount = () => {
		
	}

	render() {
		return (
			<div className="CreateArticle">
				<BreadCrumb name="发表文章" />
				<div style={{ marginTop: '20px' }}>
					<h1 style={{ textAlign: 'center' }}>创作文章</h1>
					<div className="list">
						<div className="list-item">
							<div style={{marginBottom: '5px'}}>标题: </div>
							<Input ref="blogInput" placeholder="请填写标题" />
						</div>
						<div className="list-item">
							<div style={{marginBottom: '5px'}}>类别: </div>
							<Select defaultValue="Web" style={{width: '100%'}}>
								<Option value="Web">Web</Option>
								<Option value="IOS">IOS</Option>
								<Option value="Android">Android</Option>
							</Select>
						</div>
						<div className="list-item">
							<div style={{marginBottom: '5px'}}>封面: </div>
							<Upload
								customRequest={this.handleChange}
								accept="image"
								showUploadList={false}
							>
								<Button>
									<Icon type="upload" /> 上传封面
								</Button>
							</Upload>
							<Modal
								title="上传封面"
								visible={this.state.visible}
								onCancel={this.handleCancel}
								footer={
									<div style={{textAlign: 'center'}}>
										<Button type="primary">上传封面</Button>
									</div>
								}
							>
								<Cropper
									url={this.state.url}
									aspectRatio={8 / 3}
									cropBoxResizable={false}
									minCropBoxWidth={472}
									zoomable={false}
								/>
							</Modal>
			            </div>
						<div className="list-item">
							<div style={{marginBottom: '5px'}}>正文: </div>
							<Editor/>
						</div>
						<div className="list-item" style={{ textAlign: 'center' }}>
							<Button type="primary">提交</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}