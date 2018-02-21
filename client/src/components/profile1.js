import React, { Component } from 'react';
import { Icon, Row, Col, Divider } from 'antd';
import './profile.css';

export default class Profile1 extends Component {

	render() {
		return (
			<div className="Profile1">
				<a href="">
					<img src="https://avatars1.githubusercontent.com/u/23139022?v=4&s=120" className="img-thumbnail avatar" />
				</a>
				<h2>sceley</h2>
				<Icon type="man" />
				<p>颠三倒四多翁</p>
				<ul>
					<li><Icon type="environment-o" /></li><br />
					<li><Icon type="github" /></li>
					<li><Icon type="global" /></li>
				</ul>
				<Divider />
				<Row className="follow-info">
					<Col span={8}>
						<a className="count">0</a>
						<a className="text">关注者</a>
					</Col>
					<Col span={8}>
						<a className="count">0</a>
						<a className="text">编博客</a>
					</Col>
					<Col span={8}>
						<a className="count">0</a>
						<a className="text">编话题</a>
					</Col>
				</Row>
				<Divider />
				<Divider />
			</div>
		);
	}
}