import React, { Component } from 'react';
import { List, Avatar, Button, Layout, Tabs } from 'antd';
import Mnav from './mnav';
import Profile from './profile1';
import './club.css';

const { Sider, Content } = Layout;
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
				<Mnav name="技术论坛" />
				<Layout style={{ marginTop: '20px' }}>
					<Content>
						<div style={{ paddingRight: '10px' }}>
							<Tabs>
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
						</div>
					</Content>
					<Sider width={300}>
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
					</Sider>
				</Layout>
			</div>
		);
	}
}