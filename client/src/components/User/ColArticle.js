import React, { Component } from 'react';
import { Card, List } from 'antd';
import config from '../../config';
import ParseDate from '../../common/ParseDate';

export default class HisArticle extends Component {
	state = {
		articles: ''
	}
	componentDidMount = () => {
		let id = this.props.match.params.id;
		fetch(`${config.server}/user/${id}/colarticle`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					articles: json.articles
				});
			}
		});
	}
	render () {
		return (
			<div className="HisTopic">
				<Card title="他的文章">
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