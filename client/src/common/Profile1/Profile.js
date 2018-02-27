import React, { Component } from 'react';
import { Icon, Row, Col, Divider, Avatar, Button } from 'antd';
import CommonProfile from '../commonProfile/Profile';
import config from '../../config';
import './Profile.css';
export default class Profile1 extends Component {
	careClick = () => {
		fetch(`${config.server}/user/care/${this.props.user.id}`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				console.log(json);
			}
		});
	}
	render() {
		return (
			<div className="Profile">
				<CommonProfile user={this.props.user}/>
				<Divider />
				<ul className="button-list">
					{
						true?
						<li className="button-list-item">
							<Button onClick={this.careClick} type="primary" className="button">
								<Icon type="plus" />关注 Ta
							</Button>
						</li>
						:
						<li className="button-list-item">
							<Button type="primary" className="button">
								<Icon type="minus" />已关注
							</Button>
						</li>
					}
					<li className="button-list-item">
						<Button className="button">
							<Icon type="mail" />发私信
						</Button>
					</li>
				</ul>
			</div>
		);
	}
};