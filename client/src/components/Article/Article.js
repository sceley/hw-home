import React, { Component } from 'react';
import { Row, Col, Icon, List, Avatar, Button, Divider, Card, Anchor } from 'antd';
import md from '../../common/Markdown';
import Editor from '../../common/Editor/Editor';
import moment from 'moment';
import Profile from '../../common/Profile/Profile';
import './Article.css';

const { Link } = Anchor;

export default class Article extends Component {
	state = {
		article: '',
		comment: ''
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
			Date: moment().format('YYYY-MM-DD'),
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
			if (!json.errorcode) {
				console.log(json);
			}
		});
	}
	handleEnter = (e) => {
		let name = e.currentTarget.getAttribute('data-name');
		this.refs.editor.setValue(`@${name} `);
	}
	componentDidMount() {
		let id = this.props.match.params.id;
		fetch(`http://localhost:8080/article/${id}`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json.errorcode === 0) {
				json.article.Body = md(json.article.Body);
				this.setState({
					article: json.article,
					comment: json.comment
				});
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
							<Icon type="calendar" />2017-02-10
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
					</li>
				</ul>
			</div>
		return (
			<div className="Article" style={{ marginTop: '20px' }}>
				<Row gutter={16}>
					<Col span={18}>
						<Card title={title}>
							<div dangerouslySetInnerHTML={{
								__html: this.state.article.Body
							}}></div>
						</Card>
						<Card title={<span>{`${this.state.comment.length}个回复`}</span>} style={{marginTop: '20px'}}>
							<List
						        className="demo-loadmore-list"
						        itemLayout="horizontal"
						        dataSource={this.state.comment}
						        renderItem={item => (
						          <List.Item actions={[<a><Icon type="like-o"/></a>, <a data-name={item.Author} href="#editor" onClick={this.handleEnter}><Icon type="enter"/></a>]}>
						            <List.Item.Meta
						              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
						              title={<a href="https://ant.design">sceley</a>}
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
						<div style={{marginTop: '20px'}}>
							<Editor ref="editor"/>
							<div id="editor" style={{marginTop: '20px', textAlign: 'center'}}>
								<Button onClick={this.handleSubmit} type="primary">回复</Button>
							</div>
						</div>
					</Col>
					<Col style={{background: 'white'}} span={6}>
						<div className="user-basic-info">
							<Profile/>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}