import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Menu, Icon, Row, Col, Card, Form, Input, Button } from 'antd';

export default class UserEdit extends Component {
	render () {
		return (
			<div className="UserInfoEdit" style={{marginTop: '20px'}}>
				<Row gutter={16}>
					<Col span={6}>
						<div className="user-info-edit">
							<Menu
								onClick={this.handleClick}
								style={{ width: 256 }}
								defaultOpenKeys={['info']}
								mode="inline"
							>
								<Menu.Item key="info">
									<Icon type="profile" />个人信息
								</Menu.Item>
								<Menu.Item key="image">
									<Icon type="picture" />修改图像
								</Menu.Item>
								<Menu.Item key="msg">
									<Icon type="notification" />信息通知
								</Menu.Item>
							</Menu>
						</div>
					</Col>
					<Col span={18}>
						ddddddddwe
					</Col>
				</Row>
			</div>
			);
	}
}