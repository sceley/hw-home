import React, { Component } from 'react';
import { Card, DatePicker, Input, Button, Icon, Modal, List, Upload } from "antd";
import config from '../config';
import moment from 'moment';
const { MonthPicker } = DatePicker;

export default class Clubintr extends Component {
    state = {
        visible1: false,
        visible2: false,
        date: '',
        h_title: '',
        a_title: '',
        poster: '',
        historys: [],
        achievements: []
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
    handleDateChange = (date, dateString) => {
        this.setState({
            date: dateString
        });
    }
    handleHTChange = (e) => {
        this.setState({
            h_title: e.target.value
        });
    }
    handleATChange = (e) => {
        this.setState({
            a_title: e.target.value
        });
    }
    historySubmit = () => {
        fetch(`${config.server}/manage/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                title: this.state.h_title,
                date: this.state.date
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(json => {
            if (json && !json.err) {
                this.setState({
                    visible1: false,
                    historys: [...this.state.historys, { title: this.state.h_title, date: this.state.date }]
                });
            }
        });
    }
    achievementSubmit = () => {
        fetch(`${config.server}/manage/achievement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                title: this.state.a_title,
                poster: this.state.poster
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(json => {
            if (json && !json.err) {
                this.setState({
                    visible2: false,
                    achievements: [...this.state.achievements, { title: this.state.a_title, poster: this.state.poster}]
                });
            }
        });
    }
    deleteHistory = (id) => {
        fetch(`${config.server}/manage/history/${id}`, {
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
                const historys = this.state.historys.filter(history => history.id !== id);
                this.setState({
                    historys: historys
                });
            }
        });
    }
    deleteAchievement = (id) => {
        fetch(`${config.server}/manage/achievement/${id}`, {
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
                const achievements = this.state.achievements.filter(achievement => achievement.id !== id);
                this.setState({
                    achievements: achievements
                });
            }
        });
    }
    componentDidMount = () => {
        fetch(`${config.server}/achievements`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(json => {
            if (json && !json.err) {
                this.setState({
                    achievements: json.achievements
                });
            }
        });
        fetch(`${config.server}/historys`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(json => {
                if (json && !json.err) {
                    this.setState({
                        historys: json.historys
                    });
                }
            });
    }
    render() {
        const props = {
            name: 'image',
            action: `${config.server}/api/upload/img`,
            withCredentials: true,
            onChange: (info) => {
                if (info.file.status === 'done') {
                    const res = info.file.response;
                    this.setState({
                        poster: res.url
                    });
                }
            },
        };
        return (
            <div className="Clubintr Container">
                <Card title={
                    <div>
                        社团历史编辑
							<div style={{ float: 'right' }}>
                            <Button onClick={this.showModal1} type="primary">
                                <Icon type="plus" />
                            </Button>
                        </div>
                    </div>
                }>
                    <List
                        bordered
                        dataSource={this.state.historys}
                        renderItem={history => (
                            <List.Item actions={[<Icon onClick={() => this.deleteHistory(history.id)} type="delete" />]}>
                                {`date: ${moment(history.date).format("YYYY-MM")} title: ${history.title}`}
                            </List.Item>
                        )}
                    />
                    <Modal
                        visible={this.state.visible1}
                        onCancel={this.handleCancel1}
                        cancelText="取消"
                        okText="确定"
                        onOk={this.historySubmit}
                    >
                        <div>
                            <div>时间</div>
                            <MonthPicker onChange={this.handleDateChange} placeholder="时间选择" format={"YYYY-MM"} />
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <div>标题</div>
                            <Input defaultValue={this.state.h_title} onChange={this.handleHTChange} placeholder="标题" />
                        </div>
                    </Modal>
                </Card>

                <Card
                    style={{ marginTop: '20px' }}
                    title={
                    <div>
                        社团成就编辑
							<div style={{ float: 'right' }}>
                            <Button onClick={this.showModal2} type="primary">
                                <Icon type="plus" />
                            </Button>
                        </div>
                    </div>
                }>
                    <List
                        bordered
                        dataSource={this.state.achievements}
                        renderItem={achievement => (
                            <List.Item actions={[<Icon onClick={() => this.deleteAchievement(achievement.id)} type="delete" />]}>
                                {achievement.title}
                            </List.Item>
                        )}
                    />
                    <Modal
                        visible={this.state.visible2}
                        onCancel={this.handleCancel2}
                        cancelText="取消"
                        okText="确定"
                        onOk={this.achievementSubmit}
                    >
                        <div>
                            <div>海报</div>
                            <Upload
                                {...props}
                            >
                                <Button type="primary">
                                    <Icon type="upload" />
                                </Button>
                            </Upload>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <Input onChange={this.handleATChange} defaultValue={this.state.a_title} addonBefore="标题" placeholder="标题" />
                        </div>
                    </Modal>
                </Card>
            </div>
        );
    }
};