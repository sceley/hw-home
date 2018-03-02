import React, { Component } from "react";
import { Link, Route } from 'react-router-dom';
import { Row, Col, Divider, Button, Icon, Menu } from 'antd';
import Profile from '../../common/Profile/Profile';
import CurrentAction from './CurrentAction';
import HisTopic from './HisTopic';
import HisArticle from './HisArticle';
import HisCaring from './HisCaring';
import Follower from './Follower';
import ColArticle from './ColArticle';
import ColTopic from './ColTopic';
import config from '../../config';
import './User.css';
export default class User extends Component {
	state = {
		user: '',
		current: ''
	}
	componentDidMount = () => {
		let id = this.props.match.params.id;
		fetch(`${config.server}/user/${id}`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					user: json.user
				});
			}
		});
	}

	handleClick = (e) => {
		this.setState({
			current: e.key
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
						<div style={{marginTop: '20px'}}>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.current]}
							mode="inline"
							theme="dark"
						>
							<Menu.Item key="article">
								<Link to={`${this.props.match.url}/colarticle`}>
									<Icon type="home" />他收藏的文章
								</Link>
							</Menu.Item>
							<Menu.Item key="topic">
								<Link to={`${this.props.match.url}/coltopic`}>
									<Icon type="lock" />他关注的话题
								</Link>
							</Menu.Item>
							<Menu.Item key="caring">
								<Link to={`${this.props.match.url}/following`}>
									<Icon type="picture" />他关注的用户
								</Link>
							</Menu.Item>
						</Menu>
						</div>
					</Col>
					<Col span={18}>
						<Route exact path='/user/:id' component={CurrentAction}/>
						<Route path='/user/:id/topic' component={HisTopic}/>
						<Route path='/user/:id/article' component={HisArticle}/>
						<Route path='/user/:id/following' component={HisCaring}/>
						<Route path='/user/:id/follower' component={Follower}/>
						<Route path='/user/:id/coltopic' component={ColTopic} />
						<Route path='/user/:id/colarticle' component={ColArticle} />
					</Col>
				</Row>
			</div>
		);
	}
}