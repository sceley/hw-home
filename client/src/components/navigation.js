import React, {Component} from 'react';

import './navigation.css';
import { Menu,  Input } from 'antd';
const Search = Input.Search;
const SubMenu = Menu.SubMenu;



export default class Navigation extends Component {
  	state = {
    	current: 'home',
  	}
  	handleClick = (e) => {
    	this.setState({
      		current: e.key,
    	});
  	}
  	handleSearch = (e) => {
  		console.log(e);
  	}
  	componentWillMount() {
  		console.log('haha');
  	}
  	render() {
    	return (
    		<div className="Navigation">
		      	<Menu
		        	onClick={this.handleClick}
		        	selectedKeys={[this.state.current]}
		        	mode="horizontal"
		        	theme="dark"
		      	>
		        	<Menu.Item key="home">
		          		<a href="/">网站首页</a>
		        	</Menu.Item>
		        	<SubMenu title={<span>社团简介</span>}>
		            	<Menu.Item key="setting:1">社团历史</Menu.Item>
		            	<Menu.Item key="setting:2">社团成就</Menu.Item>
		            	<Menu.Item key="setting:3">联系方式</Menu.Item>
		        	</SubMenu>
		        	<Menu.Item key="introduce">
		          		部门简介
		        	</Menu.Item>
		        	<Menu.Item key="event">
		          		近期事件
		        	</Menu.Item>
		        	<Menu.Item key="blog">
		          		<a href="" rel="noopener noreferrer">技术博客</a>
		        	</Menu.Item>
		        	<Menu.Item key="message">
		          		<a href="" rel="noopener noreferrer">个人信息</a>
		        	</Menu.Item>
		        	<SubMenu title={<span>注册登录</span>}>
		            	<Menu.Item key="setting:4">
	                        <a href="/login">登录</a>
	                    </Menu.Item>
		            	<Menu.Item key="setting:5">
	                        <a href="/logup">注册</a>
	                    </Menu.Item>
		            	<Menu.Item key="setting:6">申请会员</Menu.Item>
		        	</SubMenu>
		        	<Menu.Item>
		        		<Search
		        		      placeholder="input search text"
		        		      onSearch={this.handleSearch}
		        		      style={{ width: 200 }}
		        		    />
		        	</Menu.Item>
		      	</Menu>
	    	</div>
    	);
  	}
};