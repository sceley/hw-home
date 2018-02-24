import React, { Component } from 'react';
import { List, Card, Switch } from 'antd';
import config from '../../config';
import './ManageMember.css';

export default class ManageMember extends Component {
	state = {
		data: ''
	}
	componentDidMount = () => {
		fetch(`${config.server}/members`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.errorcode) {
				console.log(json);
				this.setState({
					data: json.members
				})
			}
		})
	}
	handleClick = (e) => {
		let id = this.mid.getAttribute("data-mid");
		let body = {
			Active: e
		};
		fetch(`${config.server}/member/${id}/allow`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(body)
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
				<Card title="会员管理">
					<List
						bordered
						dataSource={this.state.data}
						renderItem={item => (
							<List.Item
								actions={[
									<span data-mid={item.mid} ref={e => {
										this.mid = e;
									}}>
										<span style={{marginRight: '5px'}}>会员</span>
										<Switch onClick={this.handleClick} checkedChildren="否" unCheckedChildren="是" defaultChecked={Boolean(item.Active)} />
									</span>
								]}
							>
								<ul className="list">
									<li className="list-item">
										姓名:
										<span>覃永利</span>
									</li>
									<li className="list-item">
										部门:
										<span>webTeam</span>
									</li>
									<li className="list-item">
										学号:
										<span>16051223</span>
									</li>
									<li className="list-item">
										描述:
										<span>我是HelloWorld社团Web组的组员，你可以向社长求证</span>
									</li>
								</ul>
							</List.Item>
						)}
					/>
				</Card>
			</div>
		);
	}
}