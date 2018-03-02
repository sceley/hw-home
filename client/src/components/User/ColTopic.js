import React, { Component } from 'react';
import { Card, List } from 'antd';
import config from '../../config';
import ParseDate from '../../common/ParseDate';

export default class ColTopic extends Component {
	state = {
			topics: ''
	}
	componentDidMount = () => {
		let id = this.props.match.params.id;
		fetch(`${config.server}/user/${id}/coltopic`)
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
		});
	}
	render () {
		return (
			<div className="ColTopic">
				<Card title="他的话题">
					<List
						style={{ background: 'white' }}
						itemLayout="horizontal"
						dataSource={this.state.topics}
						renderItem={item => (
							<List.Item actions={[<span>{ParseDate(item.CreateAt)}</span>]}>
								<a href={`/topic/${item.id}`}>{item.Title}</a>
							</List.Item>
						)}
					/>
				</Card>
			</div>
		);
	}
};