import React, {Component} from 'react';

import './navigation.css';
import { Menu,  Input, Avatar } from 'antd';
import logo from '../logo.svg';
const Search = Input.Search;
const SubMenu = Menu.SubMenu;


export default class Navigation extends Component {
  	state = {
    	current: 'home',
    	log: false
  	}

  	handleSearch = (e) => {
  		console.log(e);
  	}

  	componentWillMount () {
  		let key = window.location.pathname.slice(1) || 'home';
  		this.setState({
	  		current: key
		});
  	}

  	render() {
    	return (
    		<nav className="Navigation">
		      	<Menu
		        	selectedKeys={[this.state.current]}
		        	defaultOpenKeys={['home']}
		        	mode="horizontal"
		        	theme="dark"
		      	>
		      		<Menu.Item style={{background: 'transparent'}}>
		      			<a href="/"><img style={{width: '60px'}} src={logo} alt="" /></a>
		      		</Menu.Item>
		        	<Menu.Item key="home">
		          		<a href="/">网站首页</a>
		        	</Menu.Item>
	            	<Menu.Item key="community">
	            		<a href="/community">社团简介</a>
	            	</Menu.Item>
	            	<Menu.Item key="departments">
	            		<a href="/departments">部门简介</a>
	            	</Menu.Item>
		        	<Menu.Item key="event">
		          		<a href="event">近期事件</a>
		        	</Menu.Item>
	          		<SubMenu title={<span>生态系统</span>}>
		            	<Menu.Item key="blog">
		            		<a href="/blog">技术博客</a>
		            	</Menu.Item>
		            	<Menu.Item key="club">
		            		<a href="/club">技术论坛</a>
		            	</Menu.Item>
		            	<Menu.Item key="resource">
		            		<a href="/resource">技术资源</a>
		            	</Menu.Item>
	        		</SubMenu>
		        	<Menu.Item key="search">
		        		<Search
		        		      placeholder="搜索"
		        		      onSearch={this.handleSearch}
		        		      style={{ width: 200 }}
		        		    />
		        	</Menu.Item>
		        	{ this.state.log?
	        			<SubMenu title={<Avatar icon="user" />}>
	        		    	<Menu.Item key="user">
	        		            <a href="/user">个人信息</a>
	        		        </Menu.Item>
	        		    	<Menu.Item key="member">
	        		    		<a href="/member">申请会员</a>
	        		    	</Menu.Item>
	        		    	<Menu.Item>
	        		            <a href="/logout">退出</a>
	        		        </Menu.Item>
	        			</SubMenu>
	        			:
			    		<SubMenu title={<span>注册｜登录</span>}>
				    		<Menu.Item key="logup">
				    			<a href="/logup">注册</a>
				    		</Menu.Item>
			    			<Menu.Item key="login">
			    		        <a href="/login">登录</a>
			    		    </Menu.Item>
			    		</SubMenu>
		        	}
		      	</Menu>
	    	</nav>
    	);
  	}
};