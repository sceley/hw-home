import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

export default class AsideNav extends Component {
	render () {
		return (
			<div className="" style={{marginTop: '20px'}}>
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
					<Menu.Item key="password">
						<Icon type="lock"/>修改密码
					</Menu.Item>
				</Menu>
			</div>
			);
	}
}