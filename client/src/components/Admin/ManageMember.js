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
		let id = e.currentTarget.getAttribute('data-id');
		fetch(`${config.server}/member/${id}/allow`, {
			method: 'GET',
			credentials: 'include',
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				
			}
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
									<span>
										<span style={{marginRight: '5px'}}>会员</span>
										<a onClick={this.handleClick} data-id={item.uid}>
											<Switch checkedChildren="否" unCheckedChildren="是" defaultChecked={Boolean(item.Active)} />
										</a>
									</span>
								]}
							>
								<ul className="list">
									<li className="list-item">
										用户名:
										<span>{item.Username}</span>
									</li>
									<li className="list-item">
										姓名:
										<span>{item.Name}</span>
									</li>
									<li className="list-item">
										部门:
										<span>{item.Team}</span>
									</li>
									<li className="list-item">
										学号:
										<span>{item.SchoolNumber}</span>
									</li>
									<li className="list-item">
										描述:
										<span>{item.Description}</span>
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