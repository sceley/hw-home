import React, { Component } from 'react';

import "./logup.css";
import { Form, Input, Row, Col, Button, Icon } from 'antd';
import Mnv from './mnav';
import 'whatwg-fetch';
const FormItem = Form.Item;

class NormalLogupForm extends Component {

  state = {
    confirmDirty: false,
    btnDisabled: true,
    captcha: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      delete values.confirm;
      delete values.captcha;
      if (!err) {
        fetch('http://localhost:8080/logup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
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
  
  checkAccount = (rule, value, callback) => {
    if (value && value.length !== 11) {
        this.setState({
          btnDisabled: true
        });
        callback("请输入正确的手机号");
    } else {
        this.setState({
            btnDisabled: false
        });
        callback();
    }
  }


  getCaptcha = () => {
    const form = this.props.form;
    let mobile = form.getFieldValue('mobile');
    let body = {
        mobile
    };
    fetch('http://localhost:8080/getcaptcha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        return res.json();
    }).then(json => {
        this.state.captcha = json.captcha;
    });
  }

  checkCaptcha = (rule, value, callback) => {
    console.log(parseInt(value));
  	if (value && parseInt(value) !== parseInt(this.state.captcha)) {
  		callback('验证码不正确');
  	} else {
  		callback();
  	}
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <div className="Logup-form">
            <div className="log-title">
                账户注册
            </div>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  label="用户名"
                >
                  {getFieldDecorator('Username', {
                    rules: [{ required: true, message: '请输入你的用户名!'}],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入用户名"/>
                  )}
                </FormItem>
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
                <FormItem
                    label="手机号"
                >
                  {getFieldDecorator('mobile', {
                    rules: [{
                      required: true, message: '请输入你的手机号!'
                    }, {
                      validator: this.checkAccount
                    }],
                  })(
                    <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="手机号"/>
                  )}
                </FormItem>
                <FormItem
                  label="邮箱验证码"
                >
                  <Row gutter={8}>
                    <Col span={12}>
                      {getFieldDecorator('captcha', {
                        rules: [{ required: true, message: '请输入验证码!', 
                    }, {
                    	validator: this.checkCaptcha,
                    }],
                      })(
                        <Input  prefix={<Icon type="code-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码"/>
                      )}
                    </Col>
                    <Col span={12}>
                      <Button disabled={this.state.btnDisabled} onClick={this.getCaptcha}>获取验证码</Button>
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

const WrappedNormalLogupForm = Form.create()(NormalLogupForm);


export default class Logup extends Component {
	render () {
    console.log(this.props);
		return (
			<div className="Logup">
                <Mnv name="注册"/>
                <Row style={{ marginTop: '20px' }} type="flex" justify="center">
			        <WrappedNormalLogupForm/>
                </Row>
			</div>
		);
	}
};