import React, { Component } from "react";
import { Card, Row, Col, Timeline } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import introduction from '../../common/introduction';
const { Meta } = Card;
export default class Introduce extends Component {
	state = {
		current: ''
	}
	handleClick = (e) => {
		this.setState({
			current: e.key
		});
	}

	render() {
		let elements = introduction.history.map(item => {
			return (
				<Timeline.Item key={item.description}>
					{item.date}
					<Card
						title={item.description}
					/>
				</Timeline.Item>
			);
		});
		return (
			<div className="Community">
				<BreadCrumb name="社团介绍" />
				<div style={{ textAlign: 'center', marginTop: '20px' }}>
					<h3>HISTORY</h3>
					<h2>社团历史</h2>
				</div>
				<div>
					<div style={{ height: '300px', background: '#e7e7e7' }}></div>
				</div>
				<div style={{ marginTop: '20px', padding: '10px' }}>
					<Timeline>
						{elements}
					</Timeline>
				</div>

				<div style={{ textAlign: 'center', marginTop: '20px' }}>
					<h3>ACHIEVEMENT</h3>
					<h2>社团成就</h2>
				</div>
				<div>
					<Row gutter={16}>
						<Col span={8}>
							<Card
								style={{ width: 300 }}
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
							>
								<Meta
									title="成就1"
									description="1..."
								/>
							</Card>
						</Col>
						<Col span={8}>
							<Card
								style={{ width: 300 }}
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
							>
								<Meta
									title="成就2"
									description="2..."
								/>
							</Card>
						</Col>
						<Col span={8}>
							<Card
								style={{ width: 300 }}
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
							>
								<Meta
									title="成就3"
									description="3..."
								/>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
						{/*<Timeline.Item>
							2014年
								<Card
								style={{ width: 300 }}
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
							>
								<Meta
									title="社团创建"
									description="在这一年HelloWorld社团创建了"
								/>
							</Card>
						</Timeline.Item>*/}