import React, { Component } from 'react';

import "./logup.css";
import { Form, Input, Row, Col, Button, Icon } from 'antd';
import Mnv from './mnav';
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
        <div className="log-wrap">
            <div className="log-title">
                账户注册
            </div>
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
                <FormItem
                  label="邮箱验证码"
                >
                  <Row gutter={8}>
                    <Col span={12}>
                      {getFieldDecorator('captcha', {
                        rules: [{ required: true, message: '请输你获取的验证码!', 
                    }, {
                    	validator: this.checkCode,
                    }],
                      })(
                        <Input  prefix={<Icon type="code-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码"/>
                      )}
                    </Col>
                    <Col span={12}>
                      <Button>获取验证码</Button>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>
              </Form>
        </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default class Logup extends Component {
	render () {
		return (
			<div className="Logup">
                <Mnv name="注册"/>
                <Row style={{ marginTop: '20px' }} type="flex" justify="center">
			        <WrappedRegistrationForm/>
                </Row>
			</div>
		);
	}
};