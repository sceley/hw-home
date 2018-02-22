import React, { Component } from 'react';
import { Route } from 'react-router';
import { Row, Col, Menu, Icon, Layout } from 'antd';
import Info from '../Info/Info';
import Avatar from '../Avatar/Avatar';
import Notify from '../Notify/Notify';
import EditPassword from '../EditPassword/EditPassword';

const { Sider, Content } = Layout;

export default class Edit extends Component {
	state = {
		key: 'info'
	}

	componentDidMount() {
		let arr = window.location.pathname.split('/');
		let key = arr[3] || 'info';
		this.setState({
			key
		});
	}

	render() {
		return (
			<div className="EditNav" style={{ marginTop: '20px' }}>
				<Layout>
					<Sider>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.key]}
							defaultSelectedKeys={['info']}
							mode="inline"
							theme="dark"
						>
							<Menu.Item key="info">
								<a href="/user/edit">
									<Icon type="profile" />个人信息
								</a>
							</Menu.Item>
							<Menu.Item key="avatar">
								<a href="/user/edit/avatar">
									<Icon type="picture" />修改图像
								</a>
							</Menu.Item>
							<Menu.Item key="notify">
								<a href="/user/edit/notify">
									<Icon type="notification" />信息通知
								</a>
							</Menu.Item>
							<Menu.Item key="password">
								<a href="/user/edit/password">
									<Icon type="lock" />修改密码
								</a>
							</Menu.Item>
						</Menu>
					</Sider>
					<Content>
						<Route exact path={`${this.props.match.url}`} component={Info} />
						<Route exact path={`${this.props.match.url}/avatar`} component={Avatar} />
						<Route exact path={`${this.props.match.url}/notify`} component={Notify} />
						<Route exact path={`${this.props.match.url}/password`} component={EditPassword} />
					</Content>
				</Layout>
			</div>
		);
	}
}