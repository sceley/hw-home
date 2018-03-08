import React, { Component } from 'react';
import { Card, Col, Row, List, Avatar, Icon, Button, Divider } from 'antd';
import Editor from '../../common/Editor/Editor';
import HisProfile from '../../common/Profile/HisProfile';
import config from '../../config';
import ParseDate from '../../common/ParseDate';
import md from '../../common/Markdown';
import './Topic.css';
import 'highlightjs/styles/atom-one-light.css';

export default class Topic extends Component {
	state = {
		topic: '',
		comments: '',
		user: '',
		uid: '',
		collected: ''
	}
	componentDidMount = () => {
		let id = this.props.match.params.id;
		fetch(`${config.server}/topic/${id}`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				json.topic.Body = md(json.topic.Body);
				this.setState({
					topic: json.topic,
					comments: json.comments,
					uid: json.uid,
					collected: json.collected
				});
				this.getUserById(json.topic.uid);
			}
		});
	}
	getUserById = (id) => {
		fetch(`${config.server}/user/${id}`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
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
	handleSubmit = () => {
		let Body = this.refs.editor.getValue();
		let pattern = /^@(\w+)\s{1}/;
		let Mentioner;
		Body = Body.replace(pattern, (match, group) => {
			Mentioner = group;
			return '';
		});
		let id = this.props.match.params.id;
		let body = {
			Body,
			Mentioner
		};
		fetch(`http://localhost:8080/topic/${id}/comment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(body)
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.componentDidMount();
			}
		});
	}
	handleEnter = (e) => {
		let name = e.currentTarget.getAttribute('data-name');
		this.refs.editor.setValue(`@${name} `);
	}

	likeClick = (e) => {
		let tid = this.props.match.params.id;
		let tcid = e.currentTarget.getAttribute('data-id');
		fetch(`${config.server}/topic/comment/${tid}/${tcid}/like`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				let comments = this.state.comments;
				for (let i = 0; i < comments.length; i++) {
					if (comments[i].id === Number(tcid)) {
						comments[i].lid = !comments[i].lid;
						if (comments[i].lid) {
							comments[i].LikeCount += 1;
						} else {
							comments[i].LikeCount -= 1;
						}
						break;
					}
				}
				this.setState({
					comments: comments
				});
			}
		});
	}

	collectClick = () => {
		let id = this.props.match.params.id;
		fetch(`${config.server}/topic/${id}/collect`, {
			credentials: 'include',
			method: 'GET'
		}).then(res => {
			if (res.ok) {
				return res.json();
			} 
		}).then(json => {
			if (!json.err) {
				this.componentDidMount();
			}
		});
	}

	render() {
		return (
			<div className="Topic" style={{ marginTop: '20px' }}>
				<Row gutter={16}>
					<Col span={18}>
						<Card title={
							<div className="topic-title">
								<h2>{this.state.topic.Title}</h2>
								<ul className="list"> 
									<li className="list-item">
										<em>时间: {ParseDate(this.state.topic.CreateAt)}</em>
									</li>
									<li className="list-item">
										<em>作者: {<a>{this.state.topic.Author}</a>}</em>
									</li>
									<li className="list-item">
										<em>浏览: {this.state.topic.visitCount}</em>
									</li>
									<li className="list-item">
										<a onClick={this.collectClick}>
											{
												this.state.collected?
												<Icon type="heart" />
												:
												<Icon type="heart-o"/>

											}
										</a>
									</li>
								</ul>
							</div>
						}>
							<div dangerouslySetInnerHTML={{
								__html: this.state.topic.Body
							}}> 
							</div>
						</Card>
						<Card
							style={{marginTop: '20px'}}
							title={<span>{`${this.state.comments.length} 回复`}</span>}
						>
							<List
						        className="comment-list"
						        itemLayout="horizontal"
						        dataSource={this.state.comments}
						        renderItem={item => (
						          <List.Item actions={[
						          						<a data-id={item.id} onClick={this.likeClick}>
						          							{
						          								item.lid?
						          								<Icon type="like"/>
						          								:
						          								<Icon type="like-o" />
						          							}
						          							{item.LikeCount}
						          						</a>, 
						          						<a data-name={item.Author} href="#editor" onClick={this.handleEnter}>
						          							<Icon type="enter"/>
						          						</a>
						          					]}>
						            <List.Item.Meta
						              avatar={<Avatar src={item.Avatar} />}
						              title={
					              		<em className="date">
					              			<a style={{marginRight: '5px'}} href="https://ant.design">sceley</a>
					              			{ParseDate(item.CreateAt)}
					              		</em>
						              }
						              description={
						              	<div>
						              		{
						              			item.Mentioner?
						              			<a href="">{`@${item.Mentioner} `}</a>:null
						              		}
						              		{
						              			item.Body
						              		}
						              	</div>
						              }
						            />
						          </List.Item>
						        )}
							/>
						</Card>
						<div style={{ marginTop: '20px' }}>
							<Editor ref="editor" />
						</div>
						<div style={{marginTop: '20px',textAlign: 'center'}}>
							<Button onClick={this.handleSubmit} type="primary">回复</Button>
						</div>
					</Col>
					<Col span={6}>
						<div className="profile-wrap">
							<HisProfile uid={this.state.topic.uid}/>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
};