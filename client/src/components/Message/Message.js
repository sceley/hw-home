import React, { Component } from "react";
import { Route, Link } from 'react-router-dom';
import { Row, Col, Menu, Icon } from 'antd';
import SendMessage from './SendMessage';
import Mymessage from './Mymessage';
export default class User extends Component {
	state = {
		current: 'mail'
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
						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.current]}
							mode="inline"
							theme="dark"
						>
							<Menu.Item key="mail">
								<Link to={`${this.props.match.url}`}>
									<Icon type="mail" />私信
								</Link>
							</Menu.Item>
							{/*<Menu.Item key="topic">
								<Link to={`${this.props.match.url}/histopic`}>
									<Icon type="notification" />通知
								</Link>
							</Menu.Item>*/}
						</Menu>
					</Col>
					<Col span={18}>
						<Route exact path={this.props.match.url} component={Mymessage}/>
						<Route path={`${this.props.match.url}/to/:id`} component={SendMessage}/>
					</Col>
				</Row>
			</div>
		);
	}
}