import React, { Component } from 'react';
import { Input, Button } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import Editor from '../../common/Editor/Editor';
import './CreateTopic.css';

export default class TopicCreate extends Component {
	state = {
		mdValue: '',
		title: ''
	}
	handleSubmit = (value) => {
		console.log(value);
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
							<Input ref="blogInput" placeholder="请填写标题" />
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