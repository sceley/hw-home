import React, { Component } from "react";
import config from '../../config';
import { Card, List, Icon } from 'antd';
export default class Mymessage extends Component {
	state = {
		messages: ''
	}
	componentDidMount = () => {
		fetch(`${config.server}/message`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					messages: json.messages
				});
			}
		});
	};
	render() {
		return (
			<div className="User">
				<Card title={<span><Icon type="mail" />我的私信</span>}>
					<List
						bordered
						dataSource={this.state.messages}
						renderItem={item => (
							<List.Item
							>
								<ul className="list">
									<li className="list-item">
										{item.Username}
										<span>给你发送了一条信息</span>
									</li>
									<li className="list-item">
										信息:
										<span>{item.Message}</span>
									</li>
								</ul>
							</List.Item>
						)}
					/>
				</Card>
			</div>
		);
	}
};