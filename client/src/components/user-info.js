import React, { Component } from 'react';

import { Form, Col, Row, Button, Input, Icon, Card } from 'antd';

import AsideNav from './AsideNav';

const FormItem = Form.Item;

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
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
  checkCode = (rule, value, callback) => {
  	let code = 2000;
  	if (value && code !== value) {
  		callback('验证码不正确');
  	} else {
  		callback();
  	}
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <div>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="邮箱"
                >
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: '邮箱格式不正确',
                    }, {
                      required: true, message: '请输入你的邮箱!',
                    }],
                  })(
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="邮箱"/>
                  )}
                </FormItem>
                <FormItem
                  label="用户名"
                >
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入你的用户名!'}],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名"/>
                  )}
                </FormItem>
                <FormItem
                  label="密码"
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: '请输入密码!',
                    }, {
                      validator: this.checkConfirm,
                    }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码"/>
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
                  <Button type="primary" htmlType="submit">修改</Button>
                </FormItem>
              </Form>
        </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class UserInfo extends Component {
	render () {
		return (
				<div className="UserInfo" style={{marginTop: '20px'}}>
					<Row gutter={16}>
                        <Col span={8}>
                            <AsideNav />
                        </Col>
                        <Col span={16}>
                            <div style={{background: 'white'}}>
                                <WrappedRegistrationForm />
                            </div>
                        </Col>
                    </Row>
				</div>
			);
	}
}