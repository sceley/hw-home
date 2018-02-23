import React, { Component } from 'react';
import { List, Avatar, Button, Tabs, Col, Row } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import Profile from '../../common/Profile/Profile';
import './Club.css';

const TabPane = Tabs.TabPane;

export default class Club extends Component {

	componentWillMount() {
	}

	handleNav = (e) => {
		console.log(e);
	}

	render() {
		let data = [{
			name: 'sceley'
		}, {
			name: 'qin'
		}, {
			name: 'yongli'
		}];
		return (
			<div className="Club">
				<BreadCrumb name="技术论坛" />
				<Row gutter={16} style={{ marginTop: '20px' }}>
					<Col span={18}>
						<Tabs style={{background: 'white'}}>
							<TabPane tab="全部" key="all">
								<List
									style={{ background: 'white' }}
									itemLayout="horizontal"
									dataSource={data}
									renderItem={item => (
										<List.Item actions={[<span>more</span>]}>
											<List.Item.Meta
												avatar={<a href=""><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></a>}
												title={<a href="https://ant.design">{item.name}</a>}
											/>
										</List.Item>
									)}
								/>
							</TabPane>
							<TabPane tab="精品" key="good">
								<List
									style={{ background: 'white' }}
									itemLayout="horizontal"
									dataSource={data}
									renderItem={item => (
										<List.Item actions={[<span>more</span>]}>
											<List.Item.Meta
												avatar={<a href=""><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></a>}
												title={<a href="https://ant.design">{item.name}</a>}
											/>
										</List.Item>
									)}
								/>
							</TabPane>
						</Tabs>
					</Col>
					<Col span={6}>
						<div className="user-basic-info">
							<Profile />
							<div>
								<a href="/topic/create">
									<Button type="primary">
										发布话题
									</Button>
								</a>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}