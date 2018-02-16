import React, { Component } from 'react';

import AsideNav from './AsideNav';

import { Row, Col, Switch, Card, Icon } from 'antd';

export default class Notify extends Component {
	render () {
		return (
				<div className="Notify">
					<Row gutter={16}>
						<Col span={8}>
							<AsideNav />
						</Col>
						<Col span={16}>
							<div>
								<Card title={<span><Icon type="setting" />Email通知设置</span>}>
									<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
								</Card>
							</div>
						</Col>
					</Row>
				</div>
			);
	}
}