import React, { Component } from 'react';
import { Switch, Card, Icon } from 'antd';
import './Notify.css';

export default class Notify extends Component {
	render() {
		return (
			<div className="Notify">
				<Card title={<span><Icon type="setting" />Email通知设置</span>}>
					<div>
						<span className="margin-right">开启邮件通知</span>
						<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
					</div>
					<div style={{ marginTop: '20px' }}>
						<span className="margin-right">屏蔽点赞通知</span>
						<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
					</div>
				</Card>
			</div>
		);
	}
}