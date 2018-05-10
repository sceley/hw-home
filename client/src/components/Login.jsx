import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card } from 'antd';
import config from '../config';
const FormItem = Form.Item;

class AdminLoginForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				fetch(`${config.server}/admin/login`, {
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
					if (json && !json.err) {
						localStorage.admin_login = true;
						this.props.history.push('/admin');
					}
				});
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="AdminLogin">
				<Card
					title="登录"
				>
					<Form 
						onSubmit={this.handleSubmit}
						style={{width: 500, margin: '0 auto'}}
					>
						<FormItem
							label="帐号"
						>
							{getFieldDecorator('account', {
								rules: [{ required: true, message: '账号不能为空!' }],
							})(
								<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
							)}
						</FormItem>
						<FormItem
							label="密码"
						>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '密码不能为空!' }],
							})(
								<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="6-16位字符（字母、数字、符号的组合）" />
								)}
						</FormItem>
						<FormItem>
							<div
								style={{textAlign: 'center'}}
							>
								<Button type="primary" htmlType="submit">
									登录
								</Button>
							</div>
						</FormItem>
					</Form>
				</Card>
			</div>
		);
	}
};

export default Form.create()(AdminLoginForm);