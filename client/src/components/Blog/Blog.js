import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Col, Row, Layout } from 'antd';
import Profile from '../../common/Profile/Profile';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import md from '../../common/Markdown';

const { Sider, Content } = Layout;

export default class Blog extends Component {

	state = {
		pageSize: 10,
		current: 1,
		total: 20,
		articles: ''
	}

	componentDidMount = () => {
		fetch('http://localhost:8080/articles')
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			console.log(json);
			if (json.errorcode === 0) {
				this.setState({
					articles: json.articles
				});
			}
		});
	}

	render() {
		const IconText = ({ type, text }) => (
			<span>
				<Icon type={type} style={{ marginRight: 8 }} />
				{text}
			</span>
		);
		return (
			<div className="Blog">
				<BreadCrumb name="技术博客" />
				<Row gutter={16} style={{ marginTop: '20px' }}>
					<Col span={18}>
							<List
								size="large"
								dataSource={this.state.articles}
								itemLayout="vertical"
								bordered
								style={{ background: 'white' }}
								renderItem={article => (
									<List.Item
										key={article.Title}
										actions={[<IconText type="eye-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
										extra={<img width={272} alt="logo" src={article.Poster} />}
									>
										<List.Item.Meta
											avatar={<Avatar src={article.Poster} />}
											title={article.Title}
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
										<div dangerouslySetInnerHTML={{
											__html: md(article.Body.slice(0, 50))
										}}>
										</div>
										<div style={{ marginTop: '20px', textAlign: 'center' }}>
											<a href={`/article/${article.blog_id}`}><Button>README MORE</Button></a>
										</div>
									</List.Item>
								)}
							/>
					</Col>
					<Col span={6}>
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
					</Col>
				</Row>
			</div>
		);
	}
}