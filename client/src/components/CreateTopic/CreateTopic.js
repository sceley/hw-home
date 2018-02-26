import React, { Component } from 'react';
import { Input, Button } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import Editor from '../../common/Editor/Editor';
import config from '../../config';
import moment from 'moment';
import './CreateTopic.css';

export default class TopicCreate extends Component {
	state = {
		title: ''
	}
	handleSubmit = (value) => {
		let Title = this.refs.Title.input.value;
		let Body = this.refs.editor.getValue();
		let body = {
			Title,
			Body
		};
		fetch(`${config.server}/topic/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body),
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json.errorcode === 0) {
				console.log(json);
			}
		});
	}
	render() {
		return (
			<div className="CreateTopic">
				<BreadCrumb name="发表话题" />
				<div style={{ marginTop: '20px' }}>
					<h1 style={{ textAlign: 'center' }}>发表话题</h1>
					<div className="list">
						<div className="list-item">
							<div style={{marginBottom: '5px'}}>标题: </div>
							<Input ref="Title" placeholder="请填写标题" />
						</div>
						<div className="list-item">
							<div style={{marginBottom: '5px'}}>正文: </div>
							<Editor ref="editor"/>
						</div>
						<div className="list-item" style={{ textAlign: 'center' }}>
							<Button onClick={this.handleSubmit} type="primary">提交</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}