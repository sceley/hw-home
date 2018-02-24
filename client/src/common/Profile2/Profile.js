import React, { Component } from 'react';
import { Icon, Row, Col, Divider, Avatar, Button } from 'antd';
import './Profile.css';

export default class Profile extends Component {

	state = {
		info: ''
	}

	componentDidMount = () => {
		fetch('http://localhost:8080/user', {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json.errorcode === 0) {
				this.setState({
					info: json.user
				});
			}
		});
	}

	render() {
		return (
			<div className="Profile">
				<a href="#">
					{
						this.state.info && this.state.info.Avatar ?
							<img src={this.state.info.Avatar} alt="avatar" className="img-thumbnail avatar" />
							:
							<Avatar style={{ backgroundColor: '#87d068' }} size="large" icon="user" />
					}
				</a>
				<h1>{ this.state.info && this.state.info.Username }</h1>
					{
						this.state.info && this.state.info.Sex == "woman" ?
						<Icon type="woman" />:<Icon type="man" />
					}
				<p><em>{ this.state.info && this.state.info.Introduction }</em></p>
				<ul className="icon-list">
					{
						this.state.info && this.state.info.City ? 
						<li><Icon type="environment" /><em style={{fontSize: '10px'}}>{this.state.info.City}</em></li>
						:null
					}
				</ul>
				<ul className="icon-list icon-list-link">
					{
						this.state.info && this.state.info.Github ?
						<li><a href={`https://github.com/${this.state.info.Github}`}><Icon type="github" /></a></li>
						:null
					}
					{
						this.state.info && this.state.info.Website ?
						<li><a href={this.state.info.Website}><Icon type="global" /></a></li>
						:null
					}
				</ul>
				<Divider />
				<div>
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
				</div>
			</div>
		);
	}
}