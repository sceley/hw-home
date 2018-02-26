import React, { Component } from 'react';
import { Form, Col, Row, Button, Input, Icon, Card, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class EditInfoForm extends Component {

	state = {
		confirmDirty: false,
		autoCompleteResult: [],
		user: ''
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				fetch('http://localhost:8080/user/edit', {
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
			} else {
				console.log(err);
			}
		});
	}

	checkUsername = (rule, value, callback) => {
		if (value && (value.length > 10 || value.length < 4)) {
			callback("长度错误：用户名应为4-10个字符");
		} else {
			fetch('http://localhost:8080/checkusername', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					Username: value
				})
			}).then(res => {
				if (res.ok) {
					return res.json();
				}
			}).then(json => {
				if (json.errorcode == 111) {
					callback(json.msg);
				} else {
					callback();
				}
			});
		}
	}

	checkEmail = (rule, value, callback) => {
		if (value) {
			fetch('http://localhost:8080/checkemail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					Email: value
				})
			}).then(res => {
				if (res.ok) {
					return res.json();
				}
			}).then(json => {
				if (json.errorcode == 111) {
					callback(json.msg);
				} else {
					callback();
				}
			});
		} else {
			callback();
		}
	}

	handleChange = (e) => {

	}

	componentDidMount = () => {
		fetch("http://localhost:8080/user", {
			credentials: 'include',
			method: 'GET'
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			console.log(json);
			if (!json.err) {
				this.setState({
					user: json.user
				});
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="Info">
				<Card title={<span><Icon type="setting" />编辑个人资料</span>}>
					<div className="EditInfoForm">
						<Form onSubmit={this.handleSubmit}>
							<FormItem
								label="邮箱"
							>
								{getFieldDecorator('Email', {
									initialValue: this.state.user && this.state.user.Email,
									rules: [{
										type: 'email', message: '邮箱格式不正确',
									}, {
										validator: this.checkEmail
									}],
								})(
									<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="如：name@website.com" />
									)}
							</FormItem>
							<FormItem
								label="用户名"
							>
								{getFieldDecorator('Username', {
									initialValue: this.state.user && this.state.user.Username,
									rules: [{
										required: true, message: '请输入你的用户名!',
									}, {
										validator: this.checkUsername
									}],
								})(
									<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="4-10个字符（汉字、字符、数字、下划线）" />
									)}
							</FormItem>
							<FormItem
								label="性别"
							>
								{getFieldDecorator('Sex', {
									initialValue: [this.state.user && this.state.user.Sex]
								})
									(
									<Select style={{ width: 120 }} onChange={this.handleChange}>
										<Option value="none">未选择</Option>
										<Option value="man">男</Option>
										<Option value="women">女</Option>
									</Select>
									)}
							</FormItem>
							<FormItem
								label="个人网站"
							>
								{getFieldDecorator('Website', {
									initialValue: this.state.user && this.state.user.Website
								})
									(
									<Input prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="如：example.com" />
									)}
							</FormItem>
							<FormItem
								label="Github Name"
							>
								{getFieldDecorator('Github', {
									initialValue: this.state.user && this.state.user.Github
								})
									(
									<Input prefix={<Icon type="github" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请跟 GitHub 上保持一致" />
									)}
							</FormItem>
							<FormItem
								label="城市"
							>
								{getFieldDecorator('Location', {
									initialValue: this.state.user && this.state.user.Location
								})
									(
									<Input prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="如：北京、广州" />
									)}
							</FormItem>
							<FormItem
								label="个人简介"
							>
								{getFieldDecorator('Introduction', {
									initialValue: this.state.user && this.state.user.Introduction
								})
									(
									<TextArea rows={4} />
									)}
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit">修改</Button>
							</FormItem>
						</Form>
					</div>
				</Card>
			</div>
		);
	}
};

export default Form.create()(EditInfoForm);