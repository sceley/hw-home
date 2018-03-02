import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Divider, Avatar } from 'antd';
import './Profile.css';
export default class Profile extends Component {
	render() {
		return (
			<div className="Profile user-basic-info">
				<div className="Icon">
					<a href={`/user/${this.props.user.id}`}>
						{
							this.props.user && this.props.user.Avatar ?
								<img src={this.props.user.Avatar} alt="avatar" className="img-thumbnail avatar" />
								:
								<Avatar style={{ backgroundColor: '#87d068' }} size="large" icon="user" />
						}
					</a>
					<h1>{ this.props.user && this.props.user.Username }</h1>
						{
							this.props.user && this.props.user.Sex === "woman" ?
							<Icon type="woman" />
							:
							<Icon type="man" />
						}
					<p>
						<em>{ this.props.user && this.props.user.Introduction }</em>
					</p>
					<ul className="icon-list">
						{
							this.props.user && this.props.user.Location ? 
							<li>
								<Icon type="environment" />
								<em style={{fontSize: '10px'}}>{this.props.user.Location}</em>
							</li>
							:
							null
						}
					</ul>
					<ul className="icon-list icon-list-link">
						{
							this.props.user && this.props.user.Github ?
							<li>
								<a href={`https://github.com/${this.props.user.Github}`}>
									<Icon type="github" />
								</a>
							</li>
							:null
						}
						{
							this.props.user && this.props.user.Website ?
							<li>
								<a href={this.props.user.Website}>
									<Icon type="global" />
								</a>
							</li>
							:null
						}
					</ul>
				</div>
				<Divider />
				<Row className="follow-user">
					<Col span={8}>
						<Link to={`/user/${this.props.user.id}/follower`}>
							<span className="count">{this.props.user.fansCount}</span>
							<span className="text">关注者</span>
						</Link>
					</Col>
					<Col span={8}>
						<Link to={`/user/${this.props.user.id}/article`}>
							<span className="count">{this.props.user.articleCount}</span>
							<span className="text">编博客</span>
						</Link>
					</Col>
					<Col span={8}>
						<Link to={`/user/${this.props.user.id}/topic`}>
							<span className="count">{this.props.user.topicCount}</span>
							<span className="text">编话题</span>
						</Link>
					</Col>
				</Row>
			</div>
		);
	}
};