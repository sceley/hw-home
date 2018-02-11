import React, { Component } from 'react';
import Mnav from './mnav';
import { Row, Col, Breadcrumb, List, Avatar } from 'antd';
import './club.css';

export default class Club extends Component {
	render () {
		let data = [{
			name: 'sceley'
		}, {
			name: 'qin'
		}, {
			name: 'yongli'
		}];
		return (
			<div className="Club">
				<Mnav name="技术论坛"/>
				<Row style={{marginTop: '20px'}} type="flex" justify="space-between">
					<Col style={{background: 'white'}} xs={24} xl={18}>
						<Breadcrumb separator={null}>
							<Breadcrumb.Item>
								<a className="link-active" href="">全部</a>
							</Breadcrumb.Item>
							<Breadcrumb.Item>
								<a className="link-active" href="">精品</a>
							</Breadcrumb.Item>
						</Breadcrumb>
						<List
					        itemLayout="horizontal"
					        dataSource={data}
					        renderItem={item => (
								<List.Item actions={[<a>edit</a>, <a>more</a>]}>
									<List.Item.Meta
									avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
									title={<a href="https://ant.design">{item.name}</a>}
									/>
								</List.Item>
					        )}
						/>
					</Col>
					<Col style={{background: 'white'}} xs={0} xl={5}>
						11
					</Col>
				</Row>
			</div>
			);
	}
}