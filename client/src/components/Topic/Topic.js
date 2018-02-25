import React, { Component } from 'react';
import { Card, Col, Row, List, Avatar, Icon, Input, Button } from 'antd';
import Editor from '../../common/Editor/Editor';
import Profile from '../../common/Profile1/Profile';
import config from '../../config';
import ParseDate from '../../common/ParseDate';
import moment from 'moment';
import md from '../../common/Markdown';
import './Topic.css';
import 'highlightjs/styles/atom-one-light.css';

const { TextArea } = Input;

export default class Topic extends Component {
	state = {
		topic: '',
		comment: ''
	}
	componentDidMount = () => {
		let id = this.props.match.params.id;
		fetch(`${config.server}/topic/${id}`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.errorcode) {
				json.topic.Body = md(json.topic.Body
					);
				console.log(json.topic);
				this.setState({
					topic: json.topic,
					comment: json.comment
				})
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
			Date: moment().format('YYYY-MM-DD'),
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
			if (!json.errorcode) {
				console.log(json);
			}
		});
	}
	handleEnter = (e) => {
		let name = e.currentTarget.getAttribute('data-name');
		this.refs.editor.setValue(`@${name} `);
	}

	render() {
		const data = [
			
		];
		return (
			<div className="Topic" style={{ marginTop: '20px' }}>
				<Row gutter={16}>
					<Col span={18}>
						<Card title={
							<div className="topic-title">
								<h2>{this.state.topic.Title}</h2>
								<ul className="list"> 
									<li className="list-item">
										<em>时间: {ParseDate(this.state.topic.Date)}</em>
									</li>
									<li className="list-item">
										<em>作者: {<a>{this.state.topic.Author}</a>}</em>
									</li>
									<li className="list-item">
										<em>浏览: {this.state.topic.View}</em>
									</li>
									<li className="list-item">
										<a><Icon type="heart" /></a>
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
							title={<span>{`${data.length} 回复`}</span>}
						>
							<List
						        className="comment-list"
						        itemLayout="horizontal"
						        dataSource={this.state.comment}
						        renderItem={item => (
						          <List.Item actions={[<a><Icon type="like-o"/></a>, <a data-name={item.Author} href="#editor" onClick={this.handleEnter}><Icon type="enter"/></a>]}>
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
						<div className="user-basic-info">
							<Profile/>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}