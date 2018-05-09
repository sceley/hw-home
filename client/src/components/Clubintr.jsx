import React, { Component } from 'react';
import { Card, DatePicker, Input, Button, Icon, Modal, List, Row, Col, Upload } from "antd";

export default class Clubintr extends Component {
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
            <div className="Clubintr Container">
                <Card title={
                    <div>
                        社团历史编辑
							<div style={{ float: 'right' }}>
                            <Button onClick={this.showModal} type="primary">
                                <Icon type="plus" />
                            </Button>
                        </div>
                    </div>
                }>
                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                    <Modal
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                    >
                        <DatePicker placeholder="日期选择" onChange={this.handleChange} />
                        <Input/>
                    </Modal>
                </Card>
                <Card
                    style={{ marginTop: '20px' }}
                    title={
                    <div>
                        社团成就编辑
							<div style={{ float: 'right' }}>
                            <Button onClick={this.showModal} type="primary">
                                <Icon type="plus" />
                            </Button>
                        </div>
                    </div>
                }>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="delete" />, <Icon type="edit" />]}
                            >
                                2018 Hack  Hackathon大赛，程序员们以项目为出发点，相聚在一起，在24h的时间内，以你们想要的方式，去做你们想做的事情——整个编程的过程几乎没有任何限制或者方向。这是一个可以彻底头脑风暴的机会，但更重要的是，你能否把你的奇思妙想，Make it come true? 2018 Hack，等你来实现。
							</Card>
                        </Col>
                    </Row>
                    <Modal
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        cancelText="取消"
                        okText="确定"
                    >
                        <div>
                            <div>海报</div>
                            <Upload
                            >
                                <Button type="primary">
                                    <Icon type="upload" />
                                </Button>
                            </Upload>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <div>文字描述</div>
                            <Input />
                        </div>
                    </Modal>
                </Card>
            </div>
        );
    }
};