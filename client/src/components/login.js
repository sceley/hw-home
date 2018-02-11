import React, { Component } from 'react';

import './login.css';

import { Form, Icon, Input, Button, Checkbox, Row } from 'antd';
import Mnav from './mnav';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
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
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: '请输入你的用户名!' }],
						})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
						)}
					</FormItem>
					<FormItem
						label="密码"
					>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入你的密码!' }],
						})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
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
	render () {
		return (
				<div className="Login">
					<Mnav name="登录"/>
					<Row style={{ marginTop: '20px' }} type="flex" justify="center">
						<WrappedNormalLoginForm/>
					</Row>
				</div>
			);
	}
};