import React, { Component } from 'react';
import { Card, Icon, Button, Row, Col, Modal, Input } from "antd";
import config from '../config';
const {TextArea} = Input;
export default class Departmentintr extends Component {
    state = {
        visible: false,
        subtitle: '',
        title: '',
        text: '',
        departments: [],
        current_id: ''
    }
    showModal = (id) => {
        this.setState({
            visible: true
        });
        if (id) {
            this.state.departments.forEach(department => {
                if (department.id == id) {
                    this.setState({
                        current_id: id,
                        title: department.title,
                        subtitle: department.subtitle,
                        text: department.text
                    });
                }
            });
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        });
    }
    handleSubtitleChange = (e) => {
        this.setState({
            subtitle: e.target.value
        });
    }
    handleTextChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    handleSubmit = () => {
        const id = this.state.current_id;
        const body =  {
            subtitle: this.state.subtitle,
            title: this.state.title,
            text: this.state.text
        };
        let url;
        if (id) {
            url = `${config.server}/manage/department/${id}/update`;
        } else {
            url = `${config.server}/manage/department`;
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(json => {
            if (json && !json.err) {
                body.id = Math.random();
                this.setState({
                    departments: [...this.state.departments, body],
                    visible: false
                });
            }
        })
    }
    componentDidMount = () => {
        fetch(`${config.server}/departments`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(json => {
                if (json && !json.err) {
                    this.setState({
                        departments: json.departments
                    });
                }
            });
    }
    deleteDepartment = (id) => {
        fetch(`${config.server}/manage/department/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(json => {
            if (json && !json.err) {
                const departments = this.state.departments.filter(department => department.id != id);
                this.setState({
                    departments: departments
                });
            }
        });
    }
    render() {
        const departments = this.state.departments.map(department => (
            <Col key={department.id} span={8}>
                <Card title={
                    <div>
                        <h3>{department.title}</h3>
                        <h4>{department.subtitle}</h4>
                    </div>
                }
                    actions={[
                        <Icon onClick={() => this.showModal(department.id)} type="edit" />,
                        <Icon onClick={() => this.deleteDepartment(department.id)} type="delete" />
                    ]}
                >
                    { department.text }
                </Card>
            </Col>
        ));
        return (
            <div className="ClubIntr Container">
                <Card title={
                    <div>
                        部门简介编辑
							<div style={{ float: 'right' }}>
                            <Button onClick={this.showModal} type="primary">
                                <Icon type="plus" />
                            </Button>
                        </div>
                    </div>
                }>
                    <Row gutter={16}>
                       { departments }
                    </Row>
                </Card>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确定"
                    onOk={this.handleSubmit}
                >
                    <div>
                        <Input defaultValue={this.state.title} onChange={this.handleTitleChange} addonBefore="标题" placeholder="标题" />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <Input defaultValue={this.state.subtitle} onChange={this.handleSubtitleChange} addonBefore="sub标题" placeholder="sub标题" />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div>文字描述</div>
                        <TextArea defaultValue={this.state.text} onChange={this.handleTextChange} rows={8} />
                    </div>
                </Modal>
            </div>
        );
    }
};