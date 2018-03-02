import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import introduce from '../../common/introduction';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
export default class Departments extends Component {
	render() {
		let intro_de = [
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: '主席团',
				description: introduce.department.main,
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: 'Web组',
				description: introduce.department.web,
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: 'Android组',
				description: introduce.department.android,
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: 'IOS组',
				description: introduce.department.ios,
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: '行政组',
				description: introduce.department.action,
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: '产品组',
				description: introduce.department.product,
			}
		];

		let elements = intro_de.map(item => {
			return (
				<Col key={item.department} xs={24} md={12} xl={8}>
					<Card
						style={{ marginTop: "20px", width: "300px" }}
						title={<h2>{item.department}</h2>}
					>
						<p>{item.description}</p>
					</Card>
				</Col>
			);
		});

		return (
			<div className="Departments">
				<BreadCrumb name="部门介绍" />

				<div style={{ marginTop: '20px' }}>
					<div style={{ textAlign: 'center' }}>
						<h1>各部门介绍</h1>
					</div>
					<Row gutter={16}>
						{elements}
					</Row>
				</div>
			</div>
		);
	}
}