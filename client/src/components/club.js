import React, { Component } from 'react';
import Mnav from './mnav';
import { List, Avatar, Button, Layout } from 'antd';
import './club.css';

const { Sider, Content } = Layout;

export default class Club extends Component {
	state = {
		clubnav: 'all'
	}

	componentWillMount () {
	}

	handleNav = (e) => {
		console.log(e);
	}

	render () {
		let clubnav;
		if (this.state.clubnav === 'all')
			clubnav = 
				<ul onClick={this.handleNav} className="club-nav">
					<li className="club-nav-item nav-active">
						<a href="">全部</a>
					</li>
					<li className="club-nav-item">
						<a href="">精品</a>
					</li>
				</ul>;
		else
			clubnav = 
				<ul onClick={this.handleNav} className="club-nav">
					<li className="club-nav-item">
						<a href="/?tab=all">全部</a>
					</li>
					<li className="club-nav-item nav-active">
						<a href="/?tab=good">精品</a>
					</li>
				</ul>;
			
		let data = [{
			name: 'sceley'
		}, {
			name: 'qin'
		}, {
			name: 'yongli'
		}];
		return (
			<div className="Club">
				<Mnav name="技术论坛"/>
				<Layout style={{marginTop: '20px'}}>
					<Content>
						<div className="breadcrumb">
							{clubnav}
						</div>
						<List
					        itemLayout="horizontal"
					        dataSource={data}
					        renderItem={item => (
								<List.Item actions={[<span>more</span>]}>
									<List.Item.Meta
									avatar={<a href=""><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></a>}
									title={<a href="https://ant.design">{item.name}</a>}
									/>
								</List.Item>
					        )}
						/>
					</Content>
					<Sider>
						<div className="card">
							<div className="breadcrumb">
								个人信息
							</div>
						</div>
						<div className="card" style={{textAlign: 'center', padding: '5px', marginTop: '20px'}}>
							<a href="/topic/create">
								<Button type="primary">
									发布话题
								</Button>
							</a>
						</div>
					</Sider>
				</Layout>
			</div>
			);
	}
}