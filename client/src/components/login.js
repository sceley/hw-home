import React, { Component } from 'react';

import './login.css';

import { Form, Icon, Input, Button, Checkbox, Row, Col, Breadcrumb } from 'antd';
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
			<div className="form-login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						<div className="text-title">
							用户登录
						</div>
					</FormItem>
					<FormItem>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
						<Checkbox>Remember me</Checkbox>
						)}
						<a className="login-form-forgot" href="">Forgot password</a>
						<Button type="primary" htmlType="submit" className="login-form-button">
						Log in
						</Button>
						<a href="">register now!</a>
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
					<div className="breadcrumb">
	                    <Breadcrumb>
	                        <Breadcrumb.Item href="/">
	                            <Icon type="home" />
	                            <span>首页</span>
	                        </Breadcrumb.Item>
	                        <Breadcrumb.Item href="#">
	                            <span>登录</span>
	                        </Breadcrumb.Item>
	                    </Breadcrumb>
                	</div>
					<Row type="flex" justify="center">
						<WrappedNormalLoginForm/>
					</Row>
				</div>
			);
	}
};