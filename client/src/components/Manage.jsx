import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import logo from '../logo.png';
import Home from './Home';
import Clubintr from './Clubintr';
import Departmentintr from './Departmentintr';
import { SSL_OP_PKCS1_CHECK_1 } from 'constants';
const { Sider, Content, Header } = Layout;

class Manage extends Component {
	state = {
		current: 'home'
	}
	handleClick = (e) => {
		this.setState({
			current: e.key
		});
	}
	handleBack = () => {
		this.setState({
			current: 'home'
		});
	}
	componentDidMount = () => {
		
	}
	render() {
		return (
			<div className="Manage">
				<Layout>
					<Sider className="shadow" width={250}>
						<Link onClick={this.handleBack} to={`/manage/home`}>
							<div style={{ height: 64, background: '#002140'}}>
								<img className="logo" src={logo} alt=""/>
							</div>
						</Link>
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.current]}
							mode="inline"
							theme="dark"
							style={{minHeight: '100vh'}}
						>
							<Menu.Item key="home">
								<Link to={`/manage/home`}>
									<Icon type="home" />首页编辑
								</Link>
							</Menu.Item>
							<Menu.Item key="clubintr">
								<Link to={`/manage/clubintr`}>
									<Icon type="home" />社团简介编辑
								</Link>
							</Menu.Item>
							<Menu.Item key="departmentintr">
								<Link to={`/manage/departmentintr`}>
									<Icon type="home" />部门简介编辑
								</Link>
							</Menu.Item>
							<Menu.Item key="event">
								<Link to={`/manage/event`}>
									<Icon type="notification" />事件编辑
								</Link>
							</Menu.Item>
							<Menu.Item key="starman">
								<Link to={`/manage/departmentintr`}>
									<Icon type="home" />名人堂编辑
								</Link>
							</Menu.Item>
						</Menu>
					</Sider>
					<Content>
						<Layout>
							<Header style={{ background: '#fff', padding: 0 }} className="shadow">
								<a href="/" className="logout-wrap">
									<Icon type="logout" />
									<span>退出登陆</span>
								</a>
								<h1 style={{ textAlign: 'center' }}>HelloWorld社团官网后台管理</h1>
							</Header>
							<Content>
								<Switch>
									<Route path={`${this.props.match.url}/home`} component={Home} />
									<Route path={`${this.props.match.url}/clubintr`} component={Clubintr} />
									<Route path={`${this.props.match.url}/departmentintr`} component={Departmentintr}/>
								</Switch>
							</Content>
						</Layout>
					</Content>
				</Layout>
			</div>
		);
	}
};
export default Manage;