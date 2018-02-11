import React, { Component } from 'react';

import { Icon, Card, Col, Row } from 'antd';

import Mnav from './mnav';

const { Meta } = Card;

export default class Departments extends Component {
	render () {
		let intro_de = [
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: '主席团',
				description: '主席团负责...'
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: 'Web组',
				description: 'Web组负责...'
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: 'Android组',
				description: 'Android组负责...'
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: 'IOS组',
				description: 'IOS组负责...'
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: '行政组',
				description: '行政组负责...'
			},
			{
				img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				department: '运营组',
				description: '运营组负责...'
			}
		];

		let elements = intro_de.map(item => {
			return (
				<Col key={ item.department } xs={24} md={12} xl={8}>
					<Card
					    cover={<img alt="example" src={ item.img } />}
					    style={ {marginTop: "20px"} }
					  >
					    <Meta
					      title={<h3>{ item.department }</h3>}
					      description={ item.description }
					    />
					</Card>
				</Col>
				);
		});

		return (
				<div className="Departments">
					<Mnav name="部门介绍"/>

                	<div style={{marginTop: '20px'}}>
                		<h1>各部门介绍</h1>
                		<Row gutter={16}>
                			{elements}						
						</Row>
                	</div>
				</div>
			);
	}
}