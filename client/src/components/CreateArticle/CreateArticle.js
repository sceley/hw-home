import React, { Component } from 'react';
import { Button, Input, Upload, Icon, Select, Modal, Form } from 'antd';
import moment from 'moment';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import Editor from '../../common/Editor/Editor';
import Cropper from '../../common/Cropper/Cropper';
import ParseImage from '../../common/ParseImage';
import './CreateArticle.css';

const Option = Select.Option;
const FormItem = Form.Item;

class CreateArticleForm extends Component {

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

	handleSubmit = (e) => {
		e.preventDefault();
	    this.props.form.validateFields((err, values) => {
			if (!err) {
				if (!this.refs.editor.getValue()) {
					return;
				}
				if (!values.Title) {
					return;
				}
				if (!values.Categories) {
					return;
				}
				if (!this.state.url) {
					return;
				}
				values.Body = this.refs.editor.getValue();
				values.Poster = this.state.url;
				fetch('http://localhost:8080/article/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values),
					credentials: 'include'
				}).then(res => {
					if (res.ok) {
						return res.json();
					}
				}).then(json => {
					if (!json.err) {
						this.props.history.push('/blog');
					}
				});
			}
	    });
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="CreateArticle">
				<BreadCrumb name="发表文章" />
				<div style={{ marginTop: '20px' }}>
					<h1 style={{ textAlign: 'center' }}>创作文章</h1>
					<div className="list">
						<Form onSubmit={this.handleSubmit}>
							<div className="list-item">
								<div style={{marginBottom: '5px'}}>标题: </div>
								<FormItem>
									{getFieldDecorator('Title')(
										<Input placeholder="请填写标题" />
									)}
								</FormItem>
							</div>
							<div className="list-item">
								<div style={{marginBottom: '5px'}}>类别: </div>
								<FormItem>
									{getFieldDecorator('Categories', {
										initialValue: "Web"
									})(
										<Select style={{width: '100%'}}>
											<Option value="Web">Web</Option>
											<Option value="IOS">IOS</Option>
											<Option value="Android">Android</Option>
											<Option value="产品">产品</Option>
											<Option value="算法">算法</Option>
										</Select>
									)}
								</FormItem>
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
									<div style={{marginTop: '10px'}}>
										{
											this.state.url ? <img className="poster" src={this.state.url} alt="img"/> : null
										}
									</div>
								</Upload>
								<Modal
									title="上传封面"
									visible={this.state.visible}
									onCancel={this.handleCancel}
									footer={
										<div style={{textAlign: 'center'}}>
											<Button onClick={this.handleUpload} type="primary">上传封面</Button>
										</div>
									}
								>
									<Cropper
										ref="cropper"
										src={this.state.src}
										aspectRatio={6 / 4}
										cropBoxResizable={false}
										minCropBoxWidth={472}
										zoomable={false}
									/>
								</Modal>
				            </div>
							<div className="list-item">
								<div style={{marginBottom: '5px'}}>正文: </div>
								<Editor ref="editor"/>
							</div>
							<div className="list-item" style={{ textAlign: 'center' }}>
								<FormItem>
									<Button htmlType="submit" type="primary">提交</Button>
								</FormItem>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
};
export default Form.create()(CreateArticleForm);