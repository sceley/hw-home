import React, { Component } from "react";
import { Card, Button, Input, Avatar } from 'antd';
import config from '../../config';
const { TextArea } = Input;
export default class User extends Component {
	state = {
		user: '',
		topics: '',
		articles: ''
	}
	componentDidMount = () => {
		let id = this.props.match.params.id;
		fetch(`${config.server}/message/input/show/${id}`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					user: json.user
				});
			}
		});
	}
	handleSubmit = () => {
		let value = this.refs.input.textAreaRef.value;
		let id = this.props.match.params.id;
		fetch(`${config.server}/message/to/${id}`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				Message: value
			})
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				console.log(json);
			}
		});
	}
	render() {
		return (
			<div className="User">
				<Card title={<h2>发私信</h2>}>
					<div>
						<Avatar src={this.state.user.Avatar}/>
						<span style={{marginLeft: '10px'}}>{this.state.user.Username}</span>
					</div>
					<div style={{marginTop: '20px'}}>
						<TextArea ref="input" rows={8}/>
					</div>
					<div style={{textAlign: 'center', marginTop: '20px'}}>
						<Button onClick={this.handleSubmit} type="primary">发送</Button>
					</div>
				</Card>
			</div>
		);
	}
}