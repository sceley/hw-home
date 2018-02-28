import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, Tabs, Col, Row, Divider, Card } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import Profile from '../../common/Profile2/Profile';
import config from '../../config';
import Topics from './Topics';
import './Club.css';

const TabPane = Tabs.TabPane;

export default class Club extends Component {
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
			if (!json.err) {
				this.setState({
					user: json.user
				});
			}
		});
	}
	render() {
		return (
			<div className="Club">
				<BreadCrumb name="技术论坛" />
				<Row gutter={16} style={{ marginTop: '20px' }}>
					<Col span={18}>
						<Tabs defaultActiveKey="all">
						    <TabPane tab="全部" key="all">
						    	<Topics/>
						    </TabPane>
						    <TabPane tab="精品" key="good">
						    	<Topics tab="good"/>
						    </TabPane>
						</Tabs>
					</Col>
					<Col span={6}>
						<div className="user-basic-info">
							<Profile user={this.state.user} />
							<Divider/>
							<Divider/>
							<div>
								<Link to="/create/topic">
									<Button type="primary">
										发布话题
									</Button>
								</Link>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}