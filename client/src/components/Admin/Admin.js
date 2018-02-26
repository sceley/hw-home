import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Menu, Col, Row, Icon, Card } from 'antd';
import ManageMember from './ManageMember';

export default class Admin extends Component {
	state = {
		current: 'home'
	}
	handleClick = (e) => {
		this.setState({
			current: e.key
		});
	}
	render () {
		return (
			<div style={{marginTop: '20px'}} className="Admin">
				<Row gutter={16}>
					<Col span={5}>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.current]}
							mode="inline"
							theme="dark"
						>
							<Menu.Item key="home">
								<Link to="/user/edit">
									<Icon type="home" />首页编辑
								</Link>
							</Menu.Item>
							<Menu.Item key="community">
								<Link to="/user/edit/password">
									<Icon type="lock" />社团编辑
								</Link>
							</Menu.Item>
							<Menu.Item key="department">
								<Link to="/user/edit/password">
									<Icon type="lock" />部门编辑
								</Link>
							</Menu.Item>
							<Menu.Item key="member">
								<Link to={`${this.props.match.url}/member`}>
									<Icon type="picture" />会员管理
								</Link>
							</Menu.Item>
							<Menu.Item key="event">
								<Link to="/user/edit/notify">
									<Icon type="notification" />事件编辑
								</Link>
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