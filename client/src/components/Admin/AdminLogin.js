import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Row } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import './AdminLogin.css';

const FormItem = Form.Item;

class AdminLoginForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				fetch('http://localhost:8080/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include',
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
			<div className="AdminLoginForm">
				<div className="log-title">
					管理员登录
				</div>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						label="帐号"
					>
						{getFieldDecorator('Account', {
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
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
};

const WrapedAdminLoginForm = Form.create()(AdminLoginForm);

export default class AdminLogin extends Component {
	render () {
		return (
			<div className="AdminLogin">
				<BreadCrumb name="管理员登录"/>
					<Row style={{marginTop: '20px'}} type="flex" justify="center">
						<WrapedAdminLoginForm />
					</Row>
			</div>
		);
	}
} 