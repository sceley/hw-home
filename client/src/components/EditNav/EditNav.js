import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Row, Col, Menu, Icon } from 'antd';
import Info from '../Info/Info';
import Avatar from '../Avatar/Avatar';
import Notify from '../Notify/Notify';
import EditPassword from '../EditPassword/EditPassword';

export default class Edit extends Component {
	state = {
		current: 'info'
	}

	componentDidMount() {
	}

	handleClick = (e) => {
		this.setState({
			current: e.key
		});
	}

	render() {
		return (
			<div className="EditNav" style={{ marginTop: '20px' }}>
				<Row gutter={16}>
					<Col span={5}>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.current]}
							mode="inline"
							theme="dark"
						>
							<Menu.Item key="info">
								<Link to="/user/edit">
									<Icon type="profile" />个人信息
								</Link>
							</Menu.Item>
							<Menu.Item key="avatar">
								<Link to="/user/edit/avatar">
									<Icon type="picture" />修改图像
								</Link>
							</Menu.Item>
							<Menu.Item key="notify">
								<Link to="/user/edit/notify">
									<Icon type="notification" />信息通知
								</Link>
							</Menu.Item>
							<Menu.Item key="password">
								<Link to="/user/edit/password">
									<Icon type="lock" />修改密码
								</Link>
							</Menu.Item>
						</Menu>
					</Col>
					<Col span={19}>
						<Route exact path={`${this.props.match.url}`} component={Info} />
						<Route exact path={`${this.props.match.url}/avatar`} component={Avatar} />
						<Route exact path={`${this.props.match.url}/notify`} component={Notify} />
						<Route exact path={`${this.props.match.url}/password`} component={EditPassword} />
					</Col>
				</Row>
			</div>
		);
	}
}