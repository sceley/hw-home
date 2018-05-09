import React, { Component } from 'react';
import { Card, Icon, Button, Row, Col } from "antd";

export default class Departmentintr extends Component {
    state = {
        visible: false
    }
    showModal = () => {
        this.setState({
            visible: true
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleChange = (date, dateString) => {

    }
    render() {
        const data = [];
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
                        <Col span={8}>
                            <Card title="Card title">Card content</Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title">Card content</Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title">Card content</Card>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
};