import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Menu, Col, Row, Icon } from 'antd';
import ManageMember from './ManageMember';
import ManageEvent from './ManageEvent';
import ManageTopic from './ManageTopic';
import ManageHome from './ManageHome';

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
								<Link to={`${this.props.match.url}`}>
									<Icon type="home" />首页管理
								</Link>
							</Menu.Item>
							<Menu.Item key="member">
								<Link to={`${this.props.match.url}/member`}>
									<Icon type="picture" />会员管理
								</Link>
							</Menu.Item>
							<Menu.Item key="topic">
								<Link to={`${this.props.match.url}/topic`}>
									<Icon type="picture" />话题编辑
								</Link>
							</Menu.Item>
							<Menu.Item key="event">
								<Link to={`${this.props.match.url}/event`}>
									<Icon type="notification" />事件发布
								</Link>
							</Menu.Item>
						</Menu>
					</Col>
					<Col span={19}>
						<Route exact path={`${this.props.match.url}`} component={ManageHome}/>
						<Route path={`${this.props.match.url}/member`} component={ManageMember}/>
						<Route path={`${this.props.match.url}/event`} component={ManageEvent}/>
						<Route path={`${this.props.match.url}/topic`} component={ManageTopic}/>
					</Col>
				</Row>
			</div>
		);
	}
}