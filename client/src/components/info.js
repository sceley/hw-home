import React, { Component } from 'react';
import { Form, Col, Row, Button, Input, Icon, Card } from 'antd';

const FormItem = Form.Item;

class EditInfoForm extends Component {

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
                    <FormItem>
                      <Button type="primary" htmlType="submit">修改</Button>
                    </FormItem>
                  </Form>
            </div>
        );
    }
}

const EditInfo = Form.create()(EditInfoForm);

export default class Info extends Component {
    render () {
        return (
            <div className="Info">
                <Card title={<span><Icon type="setting"/>编辑个人资料</span>}>
                    <EditInfo/>
                </Card>
            </div>
        );
    }
};