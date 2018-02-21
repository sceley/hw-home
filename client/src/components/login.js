import React, { Component } from 'react';

import './login.css';

import { Form, Icon, Input, Button, Checkbox, Row } from 'antd';
import Mnav from './mnav';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log(values);
			if (!err) {
				fetch('http://localhost:8080/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				}).then(res => {
					if (res.ok) {
						return res.json();
					}
				}).then(json => {
					console.log(json);
				});
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="log-wrap">
				<div className="log-title">
					账号登录
				</div>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						label="用户名"
					>
						{getFieldDecorator('Username', {
							rules: [{ required: true, message: '账号不能为空!' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号/邮箱/用户名" />
							)}
					</FormItem>
					<FormItem
						label="密码"
					>
						{getFieldDecorator('Password', {
							rules: [{ required: true, message: '密码不能为空!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="6-16位字符（字母、数字、符号的组合）" />
							)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>记住我</Checkbox>
							)}
						<a className="login-form-forgot" href="/forgetpassword">忘记密码</a>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
						<a href="/logup">现在注册!</a>
					</FormItem>
				</Form>
			</div>
		);
	}
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default class Login extends Component {
	render() {
		return (
			<div className="Login">
				<Mnav name="登录" />
				<Row style={{ marginTop: '20px' }} type="flex" justify="center">
					<WrappedNormalLoginForm />
				</Row>
			</div>
		);
	}
};