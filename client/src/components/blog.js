import React, { Component } from 'react';
import Mnav from './mnav';

import { List, Avatar, Icon } from 'antd';

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
		for (let i = 1; i <= 10; i++) {
			listData.push({
			    href: 'http://ant.design',
			    title: `ant design part ${i}`,
			    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
			    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
			});
		}

		return (
				<div className="Blog">
					<Mnav name="技术博客" />
					<div style={{background: 'white'}}>
						<List
						    size="large"
						    pagination={this.state}
						    dataSource={listData}
						    itemLayout="vertical"
						    renderItem={item => (
								<List.Item
									key={item.title}
									actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
									extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
								>
									<List.Item.Meta
										avatar={<Avatar src={item.avatar} />}
										title={<a href={item.href}>{item.title}</a>}
										description={item.description}
									/>
									{item.content}
								</List.Item>
							)}
						/>
					</div>
				</div>
			);
	}
}