import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import ParseDate from '../../common/ParseDate';
import config from '../../config';

export default class Topics extends Component {
	state = {
		topics: '',
		current: 1,
		count: 0
	}
	componentDidMount = () => {
		let tab = this.props.tab;
		let url1, url2;
		if (tab) {
			url1 = `${config.server}/topics?tab=${tab}`
			url2 = `${config.server}/topics/count?tab=${tab}`
		} else {
			url1 = `${config.server}/topics`;
			url2 = `${config.server}/topics/count`;
		}
		fetch(url1)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.errorcode) {
				this.setState({
					topics: json.topics
				});
			}
		});

		fetch(url2)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.errorcode) {
				this.setState({
					count: json.count
				});
			}
		});
	}
	pullTopics = (key) => {
		let tab = this.props.tab;
		fetch(`${config.server}/topics?tab=${tab}&page=${key}`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.errorcode) {
				this.setState({
					topics: json.topics
				});
			}
		});
	}

	render () {
		const pagination = {
			pageSize: 5,
			current: this.state.current,
			total: Number(this.state.count),
			onChange: ((key) => {
				this.setState({
					current: key
				});
				this.pullTopics(key);
			}),
		};
		return (
			<div className="Topics">
				<div style={{padding: '20px'}}>
					<List
						pagination={pagination}
						style={{ background: 'white' }}
						itemLayout="horizontal"
						dataSource={this.state.topics}
						renderItem={item => (
							<List.Item actions={[<span>{ParseDate(item.CreateAt)}</span>]}>
								<List.Item.Meta
									avatar={<a href=""><Avatar src={item.Avatar} /></a>}
									title={<a href="https://ant.design">{item.Author}</a>}
									description={<h3><a href={`/topic/${item.id}`}>{item.Title}</a></h3>}
								/>
							</List.Item>
						)}
					/>
				</div>
			</div>
		);
	}
}