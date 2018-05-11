import React, { Component } from 'react';
import { Card, Upload, Icon, Button, Row, Col, Modal, Input } from 'antd';
import config from '../config';
const { TextArea } = Input;

export default class ManageHome extends Component {
	state = {
		visible: false,
		fileList: [],
		recentevents: [],
		poster: '',
		link: '',
		text: '',
		current_id: ''
	}
	componentDidMount = () => {
		fetch(`${config.server}/banners`)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
			}).then(json => {
				if (json && !json.err) {
					this.setState({
						fileList: [...this.state.fileList, ...json.banners]
					});
				}
			});
		fetch(`${config.server}/recentevents`)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
			}).then(json => {
				if (json && !json.err) {
					this.setState({
						recentevents: [...this.state.recentevents, ...json.recentevents]
					});
				}
			});
	}
	showModal = (id) => {
		this.setState({
			visible: true
		});
		if (id) {
			this.state.recentevents.forEach(event => {
				if (event.id === id) {
					this.setState({
						current_id: id,
						link: event.link,
						poster: event.poster,
						text: event.text
					});
				}
			});
		}
	}
	handleCancel = () => {
		this.setState({
			visible: false
		});
	}
	deleteEvent = (id) => {
		fetch(`${config.server}/manage/recentevent/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				const recentevents = this.state.recentevents.filter(recentevent => recentevent.id !== id);
				this.setState({
					recentevents: recentevents
				});
			}
		});
	}
	handleLinkChange = (e) => {
		this.setState({
			link: e.target.value
		});
	}
	handleTextChange = (e) => {
		this.setState({
			text: e.target.value
		});
	}
	handleAddBanner = (url) => {
		fetch(`${config.server}/manage/banner`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				poster: url
			})
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				
			}
		});
	}
	handleDelBanner = (banner) => {
		fetch(`${config.server}/manage/banner/${banner.uid}`, {
			method: 'DELETE',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				const fileList = this.state.fileList.filter(file => file.id !== banner.uid)
				this.setState({
					fileList: fileList
				});
			}
		});
	}
	handleSubmit = () => {
		const id = this.state.current_id;
		let url;
		if (id) {
			url = `${config.server}/manage/recentevent/${id}/update`;
		} else {
			url = `${config.server}/manage/recentevent`;
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				poster: this.state.poster,
				link: this.state.link,
				text: this.state.text
			})
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				if (!id) {
					const recentevent = {
						id: Math.random(),
						link: this.state.link,
						text: this.state.text,
						poster: this.state.poster
					};
					this.setState({
						recentevents: [...this.state.recentevents, recentevent],
						visible: false
					});
				} else {
					const recentevents = this.state.recentevents.map(recentevent => {
						if (recentevent.id === id) {
							recentevent.link = this.state.link;
							recentevent.poster = this.state.poster;
							recentevent.text = this.state.text;
						}
						return recentevent;
					});
					this.setState({
						visible: false,
						recentevents: recentevents
					});
				}
			}
		});
	}
	render() {
		const props = {
			name: 'image',
			listType: 'picture-card',
			fileList: this.state.fileList,
			customRequest: ({ file }) => {
				const body = new FormData();
				body.append('image', file);
				fetch(`${config.server}/api/upload/img`, {
					method: 'POST',
					credentials: 'include',
					body: body
				}).then(res => {
					if (res.ok) {
						return res.json();
					}
				}).then(json => {
					if (json && !json.err) {
						const fileList = this.state.fileList;
						fileList.push({
							uid: Math.random(),
							url: json.url
						});
						this.handleAddBanner(json.url);
						this.setState({
							fileList: fileList
						});
					}
				});
			},
			onChange: ({ file, fileList }) => {
				if (file.status === 'removed') {
					this.setState({
						fileList: fileList
					});
					this.handleDelBanner(file);
				}
			}
		};
		const _props = {
			name: 'image',
			action: `${config.server}/api/upload/img`,
			withCredentials: true,
			onChange: ({ file }) => {
				if (file.status === 'done') {
					const res = file.response;
					this.setState({
						poster: res.url
					});
				}
			},
		};
		const events = this.state.recentevents.map(event => (
			<Col key={event.id} span={8}>
				<Card
					cover={
						<a href={event.link}>
							<img alt="example" src={event.poster} />
						</a>
					}
					actions={[
						<Icon onClick={() => this.deleteEvent(event.id)} type="delete" />,
						<Icon onClick={() => this.showModal(event.id)} type="edit" />
					]}
				>
					<div style={{ textIndent: '2em' }}>{event.text}</div>
				</Card>
			</Col>
		));
		return (
			<div className="Banner Container">
				<Card
					title={
						<div>
							Banner编辑
						</div>
					}
				>
					<Upload
						{...props}
					>
						<div>
							<Icon type="plus" />
							<div className="ant-upload-text">Upload</div>
						</div>
					</Upload>
				</Card>
				<Card
					style={{ marginTop: 20 }}
					title={
						<div>
							近期事件编辑编辑
							<div style={{ float: 'right' }}>
								<Button onClick={this.showModal} type="primary">
									<Icon type="plus" />
								</Button>
							</div>
						</div>
					}
				>
					<Row gutter={16}>
						{events}
					</Row>
					<Modal
						visible={this.state.visible}
						onCancel={this.handleCancel}
						cancelText="取消"
						okText="确定"
						onOk={this.handleSubmit}
					>
						<div>
							<div>海报</div>
							<Upload
								{..._props}
							>
								<Button type="primary">
									<Icon type="upload" />
								</Button>
							</Upload>
						</div>
						<div style={{ marginTop: 20 }}>
							<Input defaultValue={this.state.link} onChange={this.handleLinkChange} addonBefore="链接" placeholder="链接" />
						</div>
						<div style={{ marginTop: 20 }}>
							<div>文字描述</div>
							<TextArea defaultValue={this.state.text} onChange={this.handleTextChange} rows={8} />
						</div>
					</Modal>
				</Card>
			</div>
		);
	}
};