import React, { Component } from 'react';
import { Icon, Row, Col, Divider, Avatar, Button } from 'antd';
import './Profile.css';

export default class Profile1 extends Component {

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
				<a href="#">
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
						this.state.user && this.state.user.City ? 
						<li><Icon type="environment" /><em style={{fontSize: '10px'}}>{this.state.user.City}</em></li>
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
				<ul className="button-list">
					{
						true?
						<li className="button-list-item">
							<Button type="primary" className="button">
								<Icon type="plus" />关注 Ta
							</Button>
						</li>
						:
						<li className="button-list-item">
							<Button type="primary" className="button">
								<Icon type="minus" />已关注
							</Button>
						</li>
					}
					<li className="button-list-item">
						<Button className="button">
							<Icon type="mail" />发私信
						</Button>
					</li>
				</ul>
			</div>
		);
	}
}