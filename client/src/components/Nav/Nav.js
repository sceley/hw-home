import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Input, Avatar, Modal, Button, Badge } from 'antd';
import logo from './logo.svg';
import './Nav.css';

const Search = Input.Search;
const SubMenu = Menu.SubMenu;

export default class Navigation extends Component {
	state = {
		current: 'home',
		visible: false,
		user: null,
	}

	handleSearch = (e) => {
	}

	showModal = () => {
		this.setState({
			visible: true
		});
	}

	handleCancel = () => {
		this.setState({
			visible: false
		});
	}

	handleClick = (e) => {
		if (e.key === 'logo' || e.key === 'search' || e.key === 'message') {
			return;
		}
		this.setState({
			current: e.key
		});
	}

	handleLogout = () => {
		fetch('http://localhost:8080/logout', {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.handleCancel();
				this.setState({
					user: null
				});
			}
		});

	}

	componentWillMount = () => {
		fetch('http://localhost:8080/user', {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
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

	render() {
		const avatar = 
			<div>
				{
					this.state.user && this.state.user.Avatar ?
					<Avatar src={this.state.user.Avatar}/>
					:
					<Avatar style={{ backgroundColor: '#87d068' }} size="large" icon="user" />
				}
			</div>
		return (
			<nav className="Navigation">
				<Menu
					selectedKeys={[this.state.current]}
					mode="horizontal"
					theme="dark"
					onClick={this.handleClick}
				>
					<Menu.Item key="logo">
						<Link to="/">
							<img style={{ width: '60px' }} src={logo} alt="logo" />
						</Link>
					</Menu.Item>
					<Menu.Item key="home">
						<Link to="/">
							网站首页
						</Link>
					</Menu.Item>
					<Menu.Item key="community">
						<Link to="/community">
							社团简介
						</Link>
					</Menu.Item>
					<Menu.Item key="department">
						<Link to="/department">
							部门简介
						</Link>
					</Menu.Item>
					<Menu.Item key="events">
						<Link to="/events">
							近期事件
						</Link>
					</Menu.Item>
					<SubMenu title={<span>生态系统</span>}>
						<Menu.Item key="blog">
							<Link to="/blog">
								技术博客
							</Link>
						</Menu.Item>
						<Menu.Item key="club">
							<Link to="/club">
								技术论坛
							</Link>
						</Menu.Item>
						<Menu.Item key="resource">
							<Link to="/resource">
								技术资源
							</Link>
						</Menu.Item>
					</SubMenu>
					<Menu.Item key="search">
						<Search
							placeholder="搜索"
							onSearch={this.handleSearch}
							enterButton
							style={{ width: 200 }}
						/>
					</Menu.Item>
					<Menu.Item key="message" style={{paddingRight: '0px'}}>
						<Link to="/message">
							<Badge style={{marginRight: '10px'}} showZero={true} count={0} />
						</Link>
					</Menu.Item>
					{	this.state.user ?
						<SubMenu style={{paddingLeft: '0px'}} title={avatar}>
							<Menu.Item key="user">
								<Link to={`/user/${this.state.user.id}`}>
									个人信息
								</Link>
							</Menu.Item>
							<Menu.Item key="member">
								<Link to="/member">
									申请会员
								</Link>
							</Menu.Item>
							<Menu.Item>
								<a onClick={this.showModal}>
									退出
								</a>
							</Menu.Item>
						</SubMenu>
						:
						<SubMenu title={<span>注册｜登录</span>}>
							<Menu.Item key="logup">
								<Link to="/logup">
									注册
								</Link>
							</Menu.Item>
							<Menu.Item key="login">
								<Link to="/login">
									登录
								</Link>
							</Menu.Item>
						</SubMenu>
					}
				</Menu>
				<Modal
					visible={this.state.visible}
					closable={false}
					footer={null}
					bodyStyle={{ textAlign: 'center' }}
					maskClosable={true}
				>
					<div className="pulse-warning">!</div>
					<h3>你确定要退出吗？</h3>
					<div style={{ marginTop: '20px' }}>
						<Button onClick={this.handleLogout} type="primary">退出</Button>
						<Button onClick={this.handleCancel} type="default" style={{ marginLeft: '10px' }}>取消</Button>
					</div>
				</Modal>
			</nav>
		);
	}
};