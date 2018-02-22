import React, { Component } from "react";
import { Row, Col, Card, Divider, Button, Layout, Icon } from 'antd';
import Profile from '../../common/Profile/Profile';
import './User.css';

const { Sider, Content } = Layout;


export default class User extends Component {
	render() {
		return (
			<div style={{ marginTop: '20px' }} className="User">
				<Layout>
					<Sider width={300}>
						<div className="user-basic-info">
							<Profile />
							<div className="edit-info">
								<a href="/user/edit">
									<Button type="primary">
										编辑个人资料
										</Button>
								</a>
							</div>
						</div>
					</Sider>
					<Content style={{ paddingLeft: '10px' }}>
						<div>
							<Card title="专栏文章">
								没有任何数据~~
								</Card>
							<Card style={{ marginTop: '20px' }} title="专栏话题">
								没有任何数据~~
								</Card>
							<Card style={{ marginTop: '20px' }} title="最新评论">
								没有任何数据~~
								</Card>
						</div>
					</Content>
				</Layout>
			</div>
		);
	}
}