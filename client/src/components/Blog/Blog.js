import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Col, Row, Layout } from 'antd';
import Profile from '../../common/Profile/Profile';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';

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


	render() {
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
				<BreadCrumb name="技术博客" />
				<Layout style={{ marginTop: '20px' }}>
					<Content>
						<div style={{ paddingRight: '10px' }}>
							<List
								size="large"
								pagination={this.state}
								dataSource={listData}
								itemLayout="vertical"
								bordered
								style={{ background: 'white' }}
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
														<em className="ant-list-item-action-split" />
													</li>
													<li>
														<IconText type="folder" text="Web" />
														<em className="ant-list-item-action-split" />
													</li>
													<li>
														<IconText type="user" text="张三" />
													</li>
												</ul>
											}
										/>
										{item.content}
										<div style={{ marginTop: '20px', textAlign: 'center' }}>
											<a href=""><Button>README MORE</Button></a>
										</div>
									</List.Item>
								)}
							/>
						</div>
					</Content>
					<Sider width={300}>
						<div className="user-basic-info">
							<Profile />
							<div>
								<a href="/article/create">
									<Button type="primary">
										发布文章
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