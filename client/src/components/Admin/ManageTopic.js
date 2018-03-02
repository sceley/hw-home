import React, { Component } from 'react';
import { List, Card, Switch } from 'antd';
import config from '../../config';
import './ManageMember.css';

export default class ManageTopic extends Component {
	state = {
		topics: ''
	}
	componentDidMount = () => {
		fetch(`${config.server}/topics`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					topics: json.topics
				});
			}
		})
	}
	handlePutGood = (e) => {
		let id = e.currentTarget.getAttribute('data-id');
		fetch(`${config.server}/manage/topic/${id}/putgood`, {
			method: 'GET',
			credentials: 'include',
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			console.log(json);
		});
	}
	handlePutTop = (e) => {
		let id = e.currentTarget.getAttribute('data-id');
		fetch(`${config.server}/manage/topic/${id}/puttop`, {
			method: 'GET',
			credentials: 'include',
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			console.log(json);
		});
	}
	
	render () {
		return (
			<div className="ManageMember">
				<Card title="话题管理">
					<List
						bordered
						dataSource={this.state.topics}
						renderItem={item => (
							<List.Item
								actions={[
									<span>
										<span style={{marginRight: '5px'}}>精品</span>
										<a onClick={this.handlePutGood} data-id={item.id}>
											<Switch checkedChildren="否" unCheckedChildren="是" defaultChecked={Boolean(item.good)} />
										</a>
									</span>,
									<span>
										<span style={{marginRight: '5px'}}>置顶</span>
										<a onClick={this.handlePutTop} data-id={item.id}>
											<Switch checkedChildren="否" unCheckedChildren="是" defaultChecked={Boolean(item.top)} />
										</a>
									</span>
								]}
							>
								{item.Title}
							</List.Item>
						)}
					/>
				</Card>
			</div>
		);
	}
};