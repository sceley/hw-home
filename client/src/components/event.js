import React, { Component } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import Mnav from './mnav';
export default class Event extends Component {
	render () {
		return (
				<div className="Event">
					<Mnav name="近期事件"/>
					<div style={{marginTop: '20px', textAlign: 'center'}}>
						<h3><Icon type="tags" /></h3>
						<h2>近期事件</h2>
					</div>
					<div style={{marginTop: '20px'}}>
						<Row gutter={16}>
							<Col span={8}>
								<Card title="Card title" bordered={false}>Card content</Card>
							</Col>
							<Col span={8}>
								<Card title="Card title" bordered={false}>Card content</Card>
							</Col>
							<Col span={8}>
								<Card title="Card title" bordered={false}>Card content</Card>
							</Col>
					    </Row>
					</div>
				</div>
			);
	}
}