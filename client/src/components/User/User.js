import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Card, Divider, Button, Icon } from 'antd';
import Profile from '../../common/Profile2/Profile';
import config from '../../config';
import './User.css';
export default class User extends Component {
	state = {
		user: ''
	}
	componentDidMount = () => {
		fetch(`${config.server}/user`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json.err === 0) {
				this.setState({
					user: json.user
				});
			}
		});
	}
	render() {
		return (
			<div style={{ marginTop: '20px' }} className="User">
				<Row gutter={16}>
					<Col span={6}>
						<div className="user-basic-info">
							<Profile user={this.state.user}/>
							<Divider/>
							<Divider/>
							<div className="edit-info">
								<Link to="/user/edit">
									<Button type="primary">
										编辑个人资料
									</Button>
								</Link>
							</div>
						</div>
					</Col>
					<Col span={18}>
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
					</Col>
				</Row>
			</div>
		);
	}
}