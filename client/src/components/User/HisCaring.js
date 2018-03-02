import React, { Component } from 'react';
import { Card, List, Avatar } from 'antd';
import config from '../../config';

export default class HisCarer extends Component {
	state = {
		followers: ''
	}
	componentDidMount = () => {
		let id = this.props.match.params.id;
		fetch(`${config.server}/his/${id}/caring`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					followers: json.followers
				});
			}
		});
	}
	render () {
		return (
			<div className="HisCarer">
				<Card>
					<List
						style={{ background: 'white' }}
						itemLayout="horizontal"
						dataSource={this.state.followers}
						renderItem={item => (
							<List.Item actions={[<span>{}</span>]}>
								<List.Item.Meta
									avatar={<a href={`/user/${item.id}`}><Avatar src={item.Avatar} /></a>}
									title={<a href={`/user/${item.id}`}>{item.Username}</a>}
								/>
							</List.Item>
						)}
					/>
				</Card>
			</div>
		);
	}
}