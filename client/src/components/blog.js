import React, { Component } from 'react';
import Mnav from './mnav';

import { List, Avatar, Icon, Button, Col, Row, Layout } from 'antd';

const { Sider, Content } = Layout;

export default class Blog extends Component {
	
	state = {
		pageSize: 10,
		current: 1,
		total: 20,
		onChange: (e) => {
			this.setState({
				current: e
			});
		},
	}
	

	render () {
		const IconText = ({ type, text }) => (
			<span>
				<Icon type={type} style={{ marginRight: 8 }} />
				{text}
			</span>
		);
		let listData = [
		];
		for (let i = 1; i <= 2; i++) {
			listData.push({
			    href: 'http://ant.design',
			    title: `大前端`,
			    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
			});
		}

		return (
				<div className="Blog">
					<Mnav name="技术博客" />
					<Layout style={{marginTop: '20px'}}>
						<Content>
							<List
							    size="large"
							    pagination={this.state}
							    dataSource={listData}
							    itemLayout="vertical"
							    bordered
							    style={{ background: 'white'}}
							    renderItem={item => (
									<List.Item
										key={item.title}
										actions={[<IconText type="eye-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
										extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
									>
										<List.Item.Meta
											avatar={<Avatar src={item.avatar} />}
											title={item.title}
											description={
												<ul className="ant-list-item-action">
													<li>
														<IconText type="calendar" text="2018-12-28" />
														<em className="ant-list-item-action-split"/>
													</li>
													<li>
														<IconText type="folder" text="Web" />
														<em className="ant-list-item-action-split"/>
													</li>
													<li>
														<IconText type="user" text="张三" />
													</li>
												</ul>
											}
										/>
										{item.content}
										<div style={{marginTop: '20px', textAlign: 'center'}}>
											<a href=""><Button>README MORE</Button></a>
										</div>
									</List.Item>
								)}
							/>
						</Content>
						<Sider>
							<div className="card">
								<div className="breadcrumb">
									个人信息
								</div>
							</div>
							<div className="card" style={{textAlign: 'center', padding: '5px', marginTop: '20px'}}>
								<a href="/article/create">
									<Button type="primary">
										发布文章
									</Button>
								</a>
							</div>
						</Sider>
					</Layout>
				</div>
			);
	}
}