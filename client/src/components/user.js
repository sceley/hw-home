import React, { Component } from "react";
import { Row, Col, Card, Divider, Button, Layout, Icon } from 'antd';
import './user.css';

const { Sider, Content } = Layout;


export default class User extends Component {
	render () {
		return (
				<div style={{marginTop: '20px'}} className="User">
					<Layout>
						<Sider width={300}>
							<div style={{background: 'white', textAlign: 'center'}}>
								<div className="user-basic-info">
									<a href="">
										<img src="https://avatars1.githubusercontent.com/u/23139022?v=4&s=120" className="img-thumbnail avatar"/>
									</a>
									<h2>sceley</h2>
										<Icon type="man" />
									<p>颠三倒四多翁</p>
									<ul>
										<li><Icon type="environment-o" /></li><br/>
										<li><Icon type="github" /></li>
										<li><Icon type="global" /></li>
									</ul>
									<Divider />
									<Row className="follow-info">
										<Col span={8}>
											<a className="count">0</a>
											<a className="text">关注者</a>
										</Col>
										<Col span={8}>
											<a className="count">0</a>
											<a className="text">编博客</a>
										</Col>
										<Col span={8}>
											<a className="count">0</a>
											<a className="text">编话题</a>
										</Col>
									</Row>
									<Divider />
									<Divider />
									<div className="edit-info">
										<a href="/user/edit">
											<Button type="primary">
												编辑个人资料
											</Button>
										</a>
									</div>
								</div>
							</div>
						</Sider>
						<Content style={{paddingLeft: '10px'}}>
							<div>
								<Card title="专栏文章">
									没有任何数据~~
								</Card>
								<Card style={{marginTop: '20px'}} title="专栏话题">
									没有任何数据~~
								</Card>
								<Card style={{marginTop: '20px'}} title="最新评论">
									没有任何数据~~
								</Card>
							</div>
						</Content>
					</Layout>
				</div>
			);
	}
}