import React, { Component } from 'react';
import { Menu, Col, Row, Icon, Card } from 'antd';
import { Route } from 'react-router';
import ManageMember from './ManageMember';

export default class Admin extends Component {
	state = {
		key: ''
	}
	handleClick = (e) => {
		this.setState({
			key: e.key
		});
	}
	render () {
		return (
			<div style={{marginTop: '20px'}} className="Admin">
				<Row gutter={16}>
					<Col span={5}>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.key]}
							defaultSelectedKeys={['info']}
							mode="inline"
							theme="dark"
						>
							<Menu.Item key="home">
								<a href="/user/edit">
									<Icon type="home" />首页编辑
								</a>
							</Menu.Item>
							<Menu.Item key="community">
								<a href="/user/edit/password">
									<Icon type="lock" />社团编辑
								</a>
							</Menu.Item>
							<Menu.Item key="department">
								<a href="/user/edit/password">
									<Icon type="lock" />部门编辑
								</a>
							</Menu.Item>
							<Menu.Item key="member">
								<a href="/admin/manage/member">
									<Icon type="picture" />会员管理
								</a>
							</Menu.Item>
							<Menu.Item key="event">
								<a href="/user/edit/notify">
									<Icon type="notification" />事件编辑
								</a>
							</Menu.Item>
						</Menu>
					</Col>
					<Col span={19}>
						<Route path={`${this.props.match.url}/member`} component={ManageMember}/>
					</Col>
				</Row>
			</div>
		);
	}
}