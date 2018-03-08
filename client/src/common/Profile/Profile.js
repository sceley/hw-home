import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Divider, Avatar } from 'antd';
import config from '../../config';
import './Profile.css';
export default class Profile extends Component {
	state = {
		user: ''
	}
	componentDidMount = () => {
		let id = this.props.uid;
		fetch(`${config.server}/user/${id}`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					user: json.user
				});
			}
		});
	}
	componentWillReceiveProps = () => {
		this.componentDidMount();
	}
	render() {
		console.log(this.props.uid);
		return (
			<div className="Profile">
				<div className="media-header">
					<a href={`/user/${this.state.user.id}`}>
						{
							this.state.user.Avatar ?
								<img src={this.state.user.Avatar} alt="avatar" className="img-thumbnail avatar" />
								:
								<Avatar style={{ backgroundColor: '#87d068' }} size="large" icon="user" />
						}
					</a>
					<h1>{ this.state.user.Username }</h1>
					<div>
						{
							this.state.user.Sex === "woman" ?
							<Icon type="woman" />
							:
							<Icon type="man" />
						}
					</div>
					<em>{ this.state.user.Introduction }</em>
					<ul className="icon-list">
						{
							this.state.user.Location ? 
							<li>
								<Icon type="environment" />
								<em style={{fontSize: '10px'}}>{this.state.user.Location}</em>
							</li>
							:
							null
						}
					</ul>
					<ul className="icon-list">
						{
							this.state.user.Github ?
							<li>
								<a href={`https://github.com/${this.state.user.Github}`}>
									<Icon type="github" />
								</a>
							</li>
							:null
						}
						{
							this.state.user.Website ?
							<li>
								<a href={this.state.user.Website}>
									<Icon type="global" />
								</a>
							</li>
							:null
						}
					</ul>
				</div>
				<Divider />
				<Row className="media-body">
					<Col span={8}>
						<Link to={`/user/${this.state.user.id}/follower`}>
							<span className="count">{this.state.user.fansCount}</span>
							<span className="text">关注者</span>
						</Link>
					</Col>
					<Col span={8}>
						<Link to={`/user/${this.state.user.id}/article`}>
							<span className="count">{this.state.user.articleCount}</span>
							<span className="text">编博客</span>
						</Link>
					</Col>
					<Col span={8}>
						<Link to={`/user/${this.state.user.id}/topic`}>
							<span className="count">{this.state.user.topicCount}</span>
							<span className="text">编话题</span>
						</Link>
					</Col>
				</Row>
			</div>
		);
	}
};