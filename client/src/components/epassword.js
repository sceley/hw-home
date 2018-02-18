import React, { Component } from 'react';

import { Card, Icon, Input, Form, Button } from 'antd';

// const { FormItem } = Form;
const FormItem = Form.Item;

class PasswordForm extends Component {

  state = {
    confirmDirty: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
     
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('Password')) {
      callback('输入的两次密码不一样!');
    } else {
      callback();
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <div className="PasswordForm">
        	<Form onSubmit={this.handleSubmit}>
				<FormItem
					label="密码"
					>
					{getFieldDecorator('Password', {
					rules: [{
						required: true, message: '请输入你的密码!',
					}, {
						validator: this.checkConfirm,
					}],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码"/>
					)}
				</FormItem>
				<FormItem
					label="确认密码"
					>
					{getFieldDecorator('confirm', {
					rules: [{
						required: true, message: '请确认你的密码!',
					}, {
						validator: this.checkPassword,
					}],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入确认密码" onBlur={this.handleConfirmBlur} />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit">注册</Button>
				</FormItem>
			</Form>
        </div>
    );
  }
}

const Password = Form.create()(PasswordForm);


export default class Epassword extends Component {
	render () {
		return (
			<div className="Epassword">
				<Card title={<span><Icon type="lock"/>修改密码</span>}>
					<Password/>
				</Card>
			</div>
		);
	}
}