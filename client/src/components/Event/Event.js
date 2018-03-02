import React, { Component } from 'react';
import { Icon, Card } from 'antd';
import md from '../../common/Markdown';
import moment from 'moment';
import config from '../../config';

export default class Article extends Component {
	state = {
		event: ""
	}
	componentDidMount() {
		let id = this.props.match.params.id;
		fetch(`${config.server}/event/${id}`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					event: json.event
				});
			}
		});
	}
	render() {
		const title = 
			<div>
				<h1>{this.state.event.Title}</h1>
				<span>
					<Icon type="calendar" />
					{ moment(this.state.event.CreateAt).format("YYYY-MM-DD")}
				</span>
			</div>
		return (
			<div className="Article" style={{ marginTop: '20px' }}>
				<Card title={title}>
					<div dangerouslySetInnerHTML={{
						__html: md(String(this.state.event.Body))
					}}></div>
				</Card>
			</div>
		);
	}
}