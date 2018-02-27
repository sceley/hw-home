import React, { Component } from 'react';
import { Icon, Row, Col, Divider, Avatar, Button } from 'antd';
import './Profile.css';

export default class Profile extends Component {

	state = {
		user: ''
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
			if (json.err === 0) {
				this.setState({
					user: json.user
				});
			}
		});
	}

	render() {
		return (
			<div className="Profile">
				<a href={`/user/${this.state.user.id}`}>
					{
						this.state.user && this.state.user.Avatar ?
							<img src={this.state.user.Avatar} alt="avatar" className="img-thumbnail avatar" />
							:
							<Avatar style={{ backgroundColor: '#87d068' }} size="large" icon="user" />
					}
				</a>
				<h1>{ this.state.user && this.state.user.Username }</h1>
					{
						this.state.user && this.state.user.Sex == "woman" ?
						<Icon type="woman" />:<Icon type="man" />
					}
				<p><em>{ this.state.user && this.state.user.Introduction }</em></p>
				<ul className="icon-list">
					{
						this.state.user && this.state.user.Location ? 
						<li><Icon type="environment" /><em style={{fontSize: '10px'}}>{this.state.user.Location}</em></li>
						:null
					}
				</ul>
				<ul className="icon-list icon-list-link">
					{
						this.state.user && this.state.user.Github ?
						<li><a href={`https://github.com/${this.state.user.Github}`}><Icon type="github" /></a></li>
						:null
					}
					{
						this.state.user && this.state.user.Website ?
						<li><a href={this.state.user.Website}><Icon type="global" /></a></li>
						:null
					}
				</ul>
				<Divider />
				<div>
					<Row className="follow-user">
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