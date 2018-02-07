import React, { Component } from 'react';

import "./logup.css";
import { Form, Input, Row, Col, Button, Icon, Breadcrumb } from 'antd';
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
  	if (value && code != value) {
  		callback('验证码不正确');
  	} else {
  		callback();
  	}
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    // const formItemLayout = null;
    // const tailFormItemLayout = null;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
            label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="E-mail"/>
          )}
        </FormItem>
        <FormItem
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password"/>
          )}
        </FormItem>
        <FormItem
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          label="Nickname"
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!'}],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username"/>
          )}
        </FormItem>
        <FormItem
          label="Captcha"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Please input the captcha you got!', 
            }, {
            	validator: this.checkCode,
            }],
              })(
                <Input  prefix={<Icon type="code-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="code"/>
              )}
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default class Logup extends Component {
	render () {
		return (
			<div className="Logup">
                <div className="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">
                            <Icon type="home" />
                            <span>首页</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            <span>注册</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="form-logup">
				  <WrappedRegistrationForm/>
                </div>
			</div>
		);
	}
};