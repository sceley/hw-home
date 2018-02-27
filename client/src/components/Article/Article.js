import React, { Component } from 'react';
import { Row, Col, Icon, List, Avatar, Button, Divider, Card, Anchor } from 'antd';
import md from '../../common/Markdown';
import Editor from '../../common/Editor/Editor';
import moment from 'moment';
import Profile1 from '../../common/Profile1/Profile';
import Profile2 from '../../common/Profile2/Profile';
import ParseDate from '../../common/ParseDate';
import config from '../../config';
import './Article.css';

const { Link } = Anchor;

export default class Article extends Component {
	state = {
		article: '',
		comment: '',
		uid: '',
		collected: '',
		user: ''
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
		let id = e.currentTarget.getAttribute('data-id');
		fetch(`${config.server}/article/comment/${id}/like`, {
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
					collected: json.collected
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
						          								JSON.parse(item.Likes) instanceof Array && JSON.parse(item.Likes).indexOf(this.state.uid) === -1 ?
						          								<Icon type="like-o" />:<Icon type="like"/>
						          							}
						          							{item.LikeCount}
						          						</a>, 
						          						<a data-name={item.Author} href="#editor" onClick={this.handleEnter}>
						          							<Icon type="enter"/>
						          						</a>
						          					]}>
						            <List.Item.Meta
						              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
						              title={
						              	<em className="date">
						              		<a style={{marginRight: '5px'}} href="https://ant.design">sceley</a>
						              		{ParseDate(item.Date)}
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
						<div className="user-basic-info">
							{
								this.state.user.id == this.state.uid?
								<Profile2 uid={this.state.uid} user={this.state.user}/>
								:
								<Profile1 uid={this.state.uid} user={this.state.user}/>
							}
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}