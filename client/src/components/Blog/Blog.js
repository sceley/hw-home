import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Icon, Button, Col, Row, Divider } from 'antd';
import Profile from '../../common/Profile/Profile';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import config from '../../config';
import md from '../../common/Markdown';
import moment from 'moment';

export default class Blog extends Component {
	state = {
		count: '',
		current: 1,
		articles: '',
		uid: '',
		user: ''
	}

	componentDidMount = () => {
		fetch(`${config.server}/articles/count`)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
			}).then(json => {
				if (!json.err) {
					this.setState({
						count: json.count
					});
				}
			});

		fetch(`${config.server}/user`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					user: json.user,
					uid: json.user.uid
				});
			}
		});
		this.pullData(this.state.current);
	}

	pullData = (page) => {
		let url;
		if (page)
			url = `${config.server}/articles?page=${page}`;
		else
			url = `${config.server}/articles`;
		fetch(url, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					articles: json.articles
				});
			}
		});
	}

	handleLikeClick = (e) => {
		if (!this.state.user)
			return;
		let id = e.currentTarget.getAttribute('data-id');
		fetch(`${config.server}/article/${id}/like`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.pullData(this.state.current);
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
							style={{background: 'white'}}
							renderItem={article => (
								<List.Item
									key={article.Title}
									actions={[
										<IconText type="eye-o" text={article.VisitCount} />,
										<IconText type="message" text={article.CommentCount} />,
										<a data-id={article.id} onClick={this.handleLikeClick}>
											{
												article.luids && article.luids.split(',').indexOf(String(this.state.uid)) !== -1?
													<IconText type="like" text={article.LikeCount} />
													:
													<IconText type="like-o" text={article.LikeCount} />
											}
										</a>
									]}
									extra={<img width={272} alt="logo" src={article.Poster} />}
								>
									<List.Item.Meta
										avatar={<Avatar src={article.Poster} />}
										title={article.Title}
										description={
											<ul className="ant-list-item-action">
												<li>
													<IconText type="calendar" text={moment(article.CreateAt).format('YYYY-MM-DD')} />
													<em className="ant-list-item-action-split" />
												</li>
												<li>
													<IconText type="folder" text={article.Categories} />
													<em className="ant-list-item-action-split" />
												</li>
												<li>
													<IconText type="user" text={article.Author} />
												</li>
											</ul>
										}
									/>
									<div dangerouslySetInnerHTML={{
										__html: md(article.Body)
									}}>
									</div>
									<div style={{ marginTop: '20px', textAlign: 'center' }}>
										<Link to={`/article/${article.id}`}>
											<Button>README MORE</Button>
										</Link>
									</div>
								</List.Item>
							)}
						/>
					</Col>
					<Col span={6}>
						{
							this.state.user?
							<div className="user-basic-info">
								<Profile user={this.state.user} />
								<Divider />
								<Divider />
								<div>
									<Link to="/create/article">
										<Button type="primary">
											发布文章
										</Button>
									</Link>
								</div>
							</div>
							:null
						}
					</Col>
				</Row>
			</div>
		);
	}
}