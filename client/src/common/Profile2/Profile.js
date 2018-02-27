import React, { Component } from 'react';
import { Row, Col } from 'antd';
import CommonProfile from '../commonProfile/Profile';
import './Profile.css';
export default class Profile extends Component {
	render() {
		console.log(this.props.user);
		return (
			<div className="Profile">
				<CommonProfile user={this.props.user} />
				<Row className="follow-user">
					<Col span={8}>
						<a className="count">0</a>
						<a className="text">关注者</a>
					</Col>
					<Col span={8}>
						<a className="count">{this.props.user.articleCount}</a>
						<a className="text">编博客</a>
					</Col>
					<Col span={8}>
						<a className="count">{this.props.user.topicCount}</a>
						<a className="text">编话题</a>
					</Col>
				</Row>
			</div>
		);
	}
};