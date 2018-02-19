import React, { Component } from "react";
import Mnav from './mnav';
import { Layout, Menu, Card, Row, Col, Timeline, Icon } from 'antd';

const { Sider, Content } = Layout;

export default class Introduce extends Component {
	state = {
		current: ''
	}
	handleClick = (e) => {
		this.setState({
			current: e.key
		});
	}

	render () {
		return (
				<div className="Community">
					<Mnav name="社团介绍"/>
					<div style={{textAlign: 'center', marginTop: '20px'}}>
						<h3>HISTORY</h3>
						<h2>社团历史</h2>
					</div>
					<div>
						<div style={{height: '300px', background: '#e7e7e7'}}></div>
					</div>
					<Layout style={{marginTop: '20px'}}>
						<Content>
						</Content>
						<Sider style={{background: 'white'}}>
							{/*<Menu
					          	theme="dark"
					          	onClick={this.handleClick}
					         	selectedKeys={[this.state.current]}
		        				defaultSelectedKeys={['stage1']}
					          	mode="inline"
					        >
					            <Menu.Item key="stage1">Stage 1</Menu.Item>
					            <Menu.Item key="stage2">Stage 2</Menu.Item>
					            <Menu.Item key="stage3">Stage 3</Menu.Item>
					            <Menu.Item key="stage4">Stage 4</Menu.Item>
					        </Menu>*/}
					        <div>
					        <Timeline>
								<Timeline.Item>
									<Card title="2014年" bordered={false}>Card content</Card>
								</Timeline.Item>
								<Timeline.Item>2015年</Timeline.Item>
								<Timeline.Item>2016年</Timeline.Item>
								<Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">2017年</Timeline.Item>
					        </Timeline>
					        </div>
					    </Sider>
				    </Layout>
				    <div style={{textAlign: 'center', marginTop: '20px'}}>
				    	<h3>ACHIEVEMENT</h3>
				    	<h2>社团成就</h2>
				    </div>
				    <div>
				    	<Row gutter={16}>
							<Col span={8}>
								<Card title="Card title" bordered={false}>Card content</Card>
							</Col>
							<Col span={8}>
								<Card title="Card title" bordered={false}>Card content</Card>
							</Col>
							<Col span={8}>
								<Card title="Card title" bordered={false}>Card content</Card>
							</Col>
				    	</Row>
				    </div>
				</div>
			);
	}
}