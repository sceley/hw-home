import React, { Component } from "react";
import { Card, List } from 'antd';
import ParseDate from '../../common/ParseDate';
import config from '../../config';
import './User.css';
export default class User extends Component {
	state = {
		topics: '',
		articles: '',
	}
	componentDidMount = () => {
		console.log(this.props.id);
		let id = this.props.match.params.id;
		fetch(`${config.server}/user/${id}/public`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					topics: json.topics,
					articles: json.articles
				});
			}
		});
	}
	render() {
		return (
			<div>
				<Card title="最近发表的文章">
					<List
						style={{ background: 'white' }}
						itemLayout="horizontal"
						dataSource={this.state.articles}
						renderItem={item => (
							<List.Item actions={[<span>{ParseDate(item.CreateAt)}</span>]}>
								<a href={`/article/${item.id}`}>{item.Title}</a>
							</List.Item>
						)}
					/>
				</Card>
				<Card style={{ marginTop: '20px' }} title="最近发表的话题">
					<List
						style={{ background: 'white' }}
						itemLayout="horizontal"
						dataSource={this.state.articles}
						renderItem={item => (
							<List.Item actions={[<span>{ParseDate(item.CreateAt)}</span>]}>
								<a href={`/article/${item.id}`}>{item.Title}</a>
							</List.Item>
						)}
					/>
				</Card>
			</div>
		);
	}
}