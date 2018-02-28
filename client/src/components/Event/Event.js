import React, { Component } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';

const { Meta } = Card;

export default class Event extends Component {
	render() {
		return (
			<div className="Event">
				<BreadCrumb name="近期事件" />
				<div style={{ marginTop: '20px', textAlign: 'center' }}>
					<Icon style={{fontSize: '2em'}} type="tags" />
					<h2>近期事件</h2>
				</div>
				<div style={{ marginTop: '20px' }}>
					<Row gutter={16}>
						<Col span={8}>
							<Card
								style={{ width: 300 }}
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
							>
								<Meta
									title="Card title"
									description="This is the description"
								/>
							</Card>
						</Col>
						<Col span={8}>
							<Card
								style={{ width: 300 }}
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
							>
								<Meta
									title="Card title"
									description="This is the description"
								/>

							</Card>
						</Col>
						<Col span={8}>
							<Card
								style={{ width: 300 }}
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
							>
								<Meta
									title="Card title"
									description="This is the description"
								/>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}