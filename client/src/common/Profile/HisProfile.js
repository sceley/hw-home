import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Divider } from 'antd';
import Profile from './Profile';
import config from '../../config';
export default class HisProfile extends Component {
	state = {
		cared: '',
		use: ''
	}
	careClick = () => {
		fetch(`${config.server}/user/care/${this.state.article.uid}`, {
			method: 'GET',
			credentials: 'include'
		}).then(res => {
			if (res.ok) {
				return res.json()
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					cared: !this.state.cared
				});
			}
		});
	}
	render () {
		return (
			<div className="HisProfile">
				<Profile uid={this.props.uid}/>
				<Divider/>
				<div className="media-footer">
					<ul className="button-list">
						{
							this.state.cared?
							<li className="list-item">
								<Button onClick={this.careClick} className="button">
									<Icon type="minus" />已关注
								</Button>
							</li>
							:
							<li className="list-item">
								<Button onClick={this.careClick} type="primary" className="button">
									<Icon type="plus" />关注 Ta
								</Button>
							</li>
						}
						<li className="list-item">
							<Link to={`/message/to/${this.props.uid}`}>
								<Button>
									<Icon type="mail" />发私信
								</Button>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}