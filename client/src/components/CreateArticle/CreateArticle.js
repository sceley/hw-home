import React, { Component } from 'react';
import { Button, Input, Upload, Icon, Select, Modal } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import Editor from '../../common/Editor/Editor';
import Cropper from '../../common/Cropper/Cropper';
import './CreateArticle.css';

const Option = Select.Option;

export default class CreateArticle extends Component {

	state = {
		visible: false
	}

	handleCancel = () => {
		this.setState({
			visible: false
		});
	}

	handleSubmit = () => {

	}

	handleChange = (e) => {
		console.log(e);
	}

	handleSubmitImg = (e) => {
		console.log(e);
	}

	showModal = () => {
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
								customRequest={this.handleImgSubmit}
								accept="image"
								showUploadList={false}
								onChange={this.showModal}
							>
								<Button>
									<Icon type="upload" /> 上传封面
								</Button>
							</Upload>
							<Modal
								title="Basic Modal"
								visible={this.state.visible}
								onCancel={this.handleCancel}
								footer={null}
							>
								<Cropper />
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