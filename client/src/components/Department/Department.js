import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import introduce from '../../common/introduction';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
export default class Departments extends Component {
	render() {
		let data = [
			{
				department: '主席团',
				description: introduce.department.main,
			},
			{
				department: 'Web组',
				description: introduce.department.web,
			},
			{
				department: 'Android组',
				description: introduce.department.android,
			},
			{
				department: 'IOS组',
				description: introduce.department.ios,
			},
			{
				department: '行政组',
				description: introduce.department.action,
			},
			{
				department: '产品组',
				description: introduce.department.product,
			}
		];
		let elements = data.map(item => {
			return (
				<Col key={item.department} span={8}>
					<Card
						style={{ marginTop: "20px" }}
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
};