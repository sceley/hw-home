import React, { Component } from 'react';
import { Row, Col, Icon, List, Avatar, Button, Divider, Card, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import md from '../../common/Markdown';
import Editor from '../../common/Editor/Editor';
import moment from 'moment';
import Profile from '../../common/Profile/Profile';
import ParseDate from '../../common/ParseDate';
import config from '../../config';
import './Article.css';

// const { Link } = Anchor;

export default class Article extends Component {
	state = {
		article: '',
		comment: '',
		uid: '',
		collected: '',
		user: '',
		cared: ''
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
		fetch(`http://localhost:8080/article/${id}/comment`, {
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
				this.refs.editor.setValue('');
			}
		});
	}
	collectClick = () => {
		let id = this.props.match.params.id;
		fetch(`${config.server}/article/${id}/collect`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					collected: !this.state.collected
				});
			}
		});
	}
	handleEnter = (e) => {
		let name = e.currentTarget.getAttribute('data-name');
		this.refs.editor.setValue(`@${name} `);
	}
	likeClick = (e) => {
		let aid = this.props.match.params.id;
		let acid = e.currentTarget.getAttribute('data-id');
		fetch(`${config.server}/article/comment/${aid}/${acid}/like`, {
			method: 'GET',
			credentials: 'include'
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

	careClick = () => {
		let uid = this.state.uid;
		fetch(`${config.server}/user/care/${this.state.article.uid}`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json()
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					cared: !this.state.cared
				});
			}
		});
	}
	componentDidMount() {
		let id = this.props.match.params.id;
		fetch(`http://localhost:8080/article/${id}`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					article: json.article,
					comment: json.comment,
					uid: json.uid,
					collected: json.collected,
					cared: json.cared
				});
				this.getUserById(json.article.uid);
			}
		});
	}
	render() {
		const title = 
			<div>
				<h1>{this.state.article.Title}</h1>
				<ul className="list-action">
					<li className="list-action-item">
						<span>
							<Icon type="calendar" />
							{ moment(this.state.article.CreateAt).format("YYYY-MM-DD")}
						</span>
						<em className="action-split"/>
					</li>
					<li className="list-action-item">
						<span>
							<Icon type="user" />
							{this.state.article.Author}
						</span>
						<em className="action-split"/>
					</li>
					<li className="list-action-item">
						<span>
							<Icon type="folder" />
							{this.state.article.Categories}
						</span>
						<em className="action-split"/>
					</li>
					<li className="list-action-item">
						<span>
							<Icon type="eye-o" />
							{this.state.article.VisitCount}
						</span>
					</li>
					<li style={{float: 'right'}} className="list-action-item">
						<a href="javascript:;" onClick={this.collectClick}>
							{
								this.state.collected?
								<Icon type="heart" />:<Icon type="heart-o" />
							}
						</a>
					</li>
				</ul>
			</div>
		return (
			<div className="Article" style={{ marginTop: '20px' }}>
				<Row gutter={16}>
					<Col span={18}>
						<Card title={title}>
							<div dangerouslySetInnerHTML={{
								__html: md(String(this.state.article.Body))
							}}></div>
						</Card>
						<Card title={<span>{`${this.state.comment.length}个回复`}</span>} style={{marginTop: '20px'}}>
							<List
						        className="comment-list"
						        itemLayout="horizontal"
						        dataSource={this.state.comment}
						        renderItem={item => (
						          <List.Item actions={[
						          						<a data-id={item.id} onClick={this.likeClick} href="javascript:;">
						          							{
						          								item.luids && item.luids.split(',').indexOf(String(this.state.uid)) !== -1?
						          								<Icon type="like"/>:<Icon type="like-o" />
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
						              		<a style={{marginRight: '5px'}} href="#">{item.Author}</a>
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
						              			<div dangerouslySetInnerHTML={{
						              				__html: md(item.Body)
						              			}}></div>
						              		}
						              	</div>
						              }
						            />
						          </List.Item>
						        )}
							/>
						</Card>
						<div style={{marginTop: '20px'}}>
							<Editor ref="editor"/>
							<div id="editor" style={{marginTop: '20px', textAlign: 'center'}}>
								<Button onClick={this.handleSubmit} type="primary">回复</Button>
							</div>
						</div>
					</Col>
					<Col style={{background: 'white'}} span={6}>
						<Profile user={this.state.user}/>
						<Divider/>
						<Divider/>
						<ul className="button-list" style={{marginBottom: '10px'}}>
							{
								this.state.cared?
								<li className="button-list-item">
									<Button onClick={this.careClick} className="button">
										<Icon type="minus" />已关注
									</Button>
								</li>
								:
								<li className="button-list-item">
									<Button onClick={this.careClick} type="primary" className="button">
										<Icon type="plus" />关注 Ta
									</Button>
								</li>
							}
							<li className="button-list-item">
								<Link to={`/message/to/${this.state.user.id}`}>
									<Button className="button">
											<Icon type="mail" />发私信
									</Button>
								</Link>
							</li>
						</ul>
					</Col>
				</Row>
			</div>
		);
	}
}