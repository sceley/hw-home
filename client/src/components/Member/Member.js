import React, { Component } from 'react';
import { Select, Form, Button, Input, Icon, Row } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import config from '../../config';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;


class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                fetch(`${config.server}/member/apply`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(values)
                });
            }
        });
    }

    checkDescription = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="log-wrap">
                <div className="log-title">
                    会员申请
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="所属部门"
                    >
                        {getFieldDecorator('Team', {
                            initialValue: "webteam",
                            rules: [{
                                required: true, message: '请选择组别!',
                            }],
                        })(
                            <Select>
                                <Option value="webteam">Web组</Option>
                                <Option value="androidteam">Android组</Option>
                                <Option value="iosteam">IOS组</Option>
                                <Option value="行政组">行政组</Option>
                                <Option value="运营组">运营组</Option>
                                <Option value="主席团">主席团</Option>
                            </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        label="姓名"
                    >
                        {getFieldDecorator('Name', {
                            rules: [{ required: true, message: '请输入你的姓名' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="真实姓名" />
                            )}
                    </FormItem>
                    <FormItem
                        label="学号"
                    >
                        {getFieldDecorator('SchoolNumber', {
                            rules: [{
                                required: true, message: '请输入你的学号'
                            }, {
                                validator: this.checkDescription
                            }],
                        })(
                            <Input placeholder="学号" />
                            )}
                    </FormItem>
                    <FormItem
                        label="描述"
                    >
                        {getFieldDecorator('Description', {
                            rules: [{
                                required: true, message: '请输入有必要的描述!'
                            }],
                        })(
                            <TextArea rows={4} placeholder="有必要的描述" />
                            )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">申请</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class Member extends Component {
    render() {
        return (
            <div className="Member">
                <BreadCrumb name="会员申请" />
                <Row style={{ marginTop: '20px' }} type="flex" justify="center">
                    <WrappedRegistrationForm />
                </Row>
            </div>
        );
    }
}