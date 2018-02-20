import React, { Component } from 'react';
import { Card, Layout, List, Avatar, Icon, Input } from 'antd';

const { Content, Sider } = Layout;
const { TextArea } = Input;

export default class Topic extends Component {

	render () {
		const data = [
		  {
		    title: 'Ant Design Title 1',
		  },
		  {
		    title: 'Ant Design Title 2',
		  },
		  {
		    title: 'Ant Design Title 3',
		  },
		  {
		    title: 'Ant Design Title 4',
		  },
		];
		return (
			<div className="Topic" style={{marginTop: '20px'}}>
				<Layout>
					<Content>
						<Card title={
							<div>
								<h2>默默</h2>
								<p>
									由
									<a href="">sceley</a>
									在
									<span>2017-02-01</span>
									<span>16:00</span>
									发布
								</p>
							</div>
						}>
						    <p>Card content</p>
						    <p>Card content</p>
						    <p>Card content</p>
						</Card>
						<List
						    itemLayout="horizontal"
						    dataSource={data}
						    renderItem={item => (
						      <List.Item  actions={[<Icon type="like-o" />, <Icon type="enter" />]}>
						        <List.Item.Meta
						          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
						          title={<a href="https://ant.design">{item.title}</a>}
						          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
						        />
						      </List.Item>
						    )}
						/>
						<div style={{marginTop: '20px'}}>
							<TextArea rows={4} />

						</div>
					</Content>
					<Sider>
					</Sider>
				</Layout>
			</div>
		);
	}
}