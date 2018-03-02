import React, { Component } from 'react';
import Cropper from '../../common/Cropper/Cropper';
import { Row, Col, Card, Icon, Upload, Modal, Button } from 'antd';
import ParseImage from '../../common/ParseImage';
import config from '../../config';
export default class ManageHome extends Component {
	state = {
		visible: false,
		posters: [],
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
				this.addHomePoster(json.url);
			}
		});
	}

	addHomePoster = (url) => {
		fetch(`${config.server}/addhomeposter`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				poster: url
			})
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			this.componentDidMount();
		});
	}

	handleDeletePoster = (e) => {
		let id = e.currentTarget.getAttribute('data-id');
		fetch(`${config.server}/homeposter/${id}`, {
			method: 'DELETE',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			this.componentDidMount();
		});
	}
	componentDidMount = () => {
		fetch(`${config.server}/homeposters`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					posters: json.posters
				});
			}
		});
	} 

	render () {
		let elements = this.state.posters.map(item => {
			return (
			<Col
				style={{marginTop: '20px'}}
				span={8}
				key={item.id}>
				<Card
					bordered
					cover={<img src={item.Poster} alt=""/>}
					actions={[<a data-id={item.id} onClick={this.handleDeletePoster}><Icon type="delete" /></a>]}
					bodyStyle={{padding: '0px'}}
				/>
			</Col>);
		});
		return (
			<div className="ManageHome">
				<h2　style={{textAlign: 'center'}}>轮播图列表</h2>
				<Row gutter={16}>
						{elements}
				</Row>
				<div style={{marginTop: '20px'}}>
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
								<Button onClick={this.handleUpload} type="primary">上传封面</Button>
							</div>
						}
					>
						<Cropper
							ref="cropper"
							src={this.state.src}
							aspectRatio={8 / 3}
							cropBoxResizable={false}
							minCropBoxWidth={472}
							zoomable={false}
						/>
					</Modal>
				</div>
			</div>
		);
	}
}