import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Col, Row, Divider } from 'antd';
import Profile from '../../common/Profile2/Profile';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import config from '../../config';
import md from '../../common/Markdown';

export default class Blog extends Component {
	state = {
		count: '',
		current: 1,
		articles: ''
	}

	componentDidMount = () => {
		fetch(`${config.server}/articles/count`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.errorcode) {
				this.setState({
					count: json.count
				});
			}
		});
		this.pullData(this.state.current);
	}

	pullData = (page) => {
		fetch(`${config.server}/articles?page=${page}`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json.errorcode === 0) {
				this.setState({
					articles: json.articles
				});
			}
		});
	}

	render() {
		const pagination = {
			pageSize: 5,
			current: this.state.current,
			total: Number(this.state.count),
			onChange: ((e) => {
				this.setState({
					current: e
				});
				this.pullData(e);
			}),
		};
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
								pagination={pagination}
								size="large"
								dataSource={this.state.articles}
								itemLayout="vertical"
								bordered
								style={{ background: 'white' }}
								renderItem={article => (
									<List.Item
										key={article.Title}
										actions={[<IconText type="eye-o" text="156" />, <IconText type="message" text="2" />, <IconText type="like-o" text="156" />]}
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
							<Divider/>
							<Divider/>
							<div>
								<a href="/create/article">
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