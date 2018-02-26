import React, { Component } from 'react';
import './Login.css';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';

const FormItem = Form.Item;

class Login extends Component {
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
					if (!json.err) {
						this.props.history.push('/', json.user);
					}
				});
			}
		});
	}
	render() {
		console.log(this.props);
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="Login">
				<BreadCrumb name="登录" />
				<Row style={{ marginTop: '20px' }} type="flex" justify="center">
					<Col span={6}>
						<div className="log-wrap">
							<div className="log-title">
								账号登录
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
									<a className="login-form-forgot" href="/forgetpassword">忘记密码</a>
									<Button type="primary" htmlType="submit" className="login-form-button">
										Log in
									</Button>
									<a href="/logup">现在注册!</a>
								</FormItem>
							</Form>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
};
export default Form.create()(Login);