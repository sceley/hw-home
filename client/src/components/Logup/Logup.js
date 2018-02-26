import React, { Component } from 'react';

import "./Logup.css";
import { Form, Input, Row, Col, Button, Icon } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
// import 'whatwg-fetch';
const FormItem = Form.Item;

class Logup extends Component {

    state = {
        confirmDirty: false,
        btnDisabled: true
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
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
                    if (!json.err) {
                        this.props.history.push('/login');
                    }
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
        if (value && (value.length < 6 || value.length > 16)) {
            callback('长度错误：密码应为6-16个字符');
        } else {
            callback();
        }
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

    checkMobile = (rule, value, callback) => {
        if (value && value.length !== 11) {
            this.setState({
                btnDisabled: true
            });
            callback("请输人11位的手机号");
        } else {
            fetch('http://localhost:8080/checkmobile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Mobile: value
                })
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(json => {
                if (json.errorcode === 111) {
                    callback(json.msg);
                } else if (json.errorcode === 0) {
                    this.setState({
                        btnDisabled: false
                    });
                    callback();
                }
            });
        }
    }



    getCaptcha = () => {
        const form = this.props.form;
        let Mobile = form.getFieldValue('Mobile');
        let body = {
            Mobile
        };
        fetch('http://localhost:8080/getcaptcha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    checkCaptcha = (rule, value, callback) => {
        if (value && value.length === 6) {
            const form = this.props.form;
            let Mobile = form.getFieldValue('Mobile');
            let Captcha = form.getFieldValue('Captcha');
            let body = {
                Mobile,
                Captcha
            };
            fetch('http://localhost:8080/checkcaptcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => {
                return res.json();
            }).then(json => {
                if (json.errorcode) {
                    callback(json.msg);
                } else {
                    callback();
                }
            });
        } else if (value && value.length !== 6) {
            callback('请输入六位验证码');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="Logup">
                <BreadCrumb name="注册" />
                <Row style={{ marginTop: '20px' }} type="flex" justify="center">
                    <Col span={6}>
                        <div className="log-wrap">
                            <div className="log-title">
                                账户注册
                            </div>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    label="用户名"
                                >
                                    {getFieldDecorator('Username', {
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
                                    label="密码"
                                >
                                    {getFieldDecorator('Password', {
                                        rules: [{
                                            required: true, message: '请输入你的密码!',
                                        }, {
                                            validator: this.checkConfirm,
                                        }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="6-16个字符（字母、数字、符号的组合）" />
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
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" onBlur={this.handleConfirmBlur} />
                                        )}
                                </FormItem>
                                <FormItem
                                    label="手机号"
                                >
                                    {getFieldDecorator('Mobile', {
                                        rules: [{
                                            required: true, message: '请输入你的手机号!'
                                        }, {
                                            validator: this.checkMobile
                                        }],
                                    })(
                                        <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="11位手机号" />
                                        )}
                                </FormItem>
                                <FormItem
                                    label="邮箱验证码"
                                >
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            {getFieldDecorator('Captcha', {
                                                rules: [{
                                                    required: true, message: '请输入验证码!',
                                                }, {
                                                    validator: this.checkCaptcha,
                                                }],
                                            })(
                                                <Input prefix={<Icon type="code-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
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
                    </Col>
                </Row>
            </div>
        );
    }
};
export default Form.create()(Logup);;