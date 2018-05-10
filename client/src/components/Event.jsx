import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card, Modal } from 'antd';
import config from '../config';

export default class Event extends Component {
    state = {
        visible1: false,
        visible2: false
    }
    handleSubmit = () => {
        
    }
    showModal1 = () => {
        this.setState({
            visible1: true
        });
    }
    showModal2 = () => {
        this.setState({
            visible2: true
        });
    }
    handleCancel1 = () => {
        this.setState({
            visible1: false
        });
    }
    handleCancel2 = () => {
        this.setState({
            visible2: false
        });
    }
    render() {
        return (
            <div className="Event Container">
                <Card
                    title={
                        <div>
                            社团日记
							<div style={{ float: 'right' }}>
                                <Button onClick={this.showModal1} type="primary">
                                    <Icon type="plus" />
                                </Button>
                            </div>
                        </div>
                    }
                >
                </Card>
                <Modal
                    visible={this.state.visible1}
                    onCancel={this.handleCancel1}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Card
                    style={{marginTop: 20}}
                    title={
                        <div>
                            事件编写
							<div style={{ float: 'right' }}>
                                <Button onClick={this.showModal2} type="primary">
                                    <Icon type="plus" />
                                </Button>
                            </div>
                        </div>
                    }
                >
                </Card>
                <Modal
                    visible={this.state.visible2}
                    onCancel={this.handleCancel2}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
};