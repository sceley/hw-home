import React, { Component } from 'react';

import Editor from './editor';
import { Input, Button } from 'antd';
import Mnav from './mnav';

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
			<div className="TopicCreate">
				<Mnav name="发表话题" />
				<div style={{ marginTop: '20px' }}>
					<h1 style={{ textAlign: 'center' }}>创作话题</h1>
					<Input ref="blogInput" placeholder="请填写标题" />
					<Editor handleSubmit={this.handleSubmit} />
					<div style={{ textAlign: 'center' }}>
						<Button type="primary">提交</Button>
					</div>
				</div>
			</div>
		);
	}
}