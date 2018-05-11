import React, { Component } from 'react';
import { Icon, Input, Button, Card, Modal, Upload, List } from 'antd';
import config from '../config';
const { TextArea } = Input;
export default class Event extends Component {
    state = {
        visible1: false,
        visible2: false,
        poster: '',
        diaries: [],
        fileList: [],
        events: [],
        photos: []
    }
    handleSubmit = () => {
        const title = this.refs.eventTitle.input.value;
        const text = this.refs.eventText.textAreaRef.value;
        const photos = this.state.fileList.map(file => {
            return file.url;
        });
        const body = {
            title: title,
            text: text,
            photos: photos
        };
        fetch(`${config.server}/manage/event`, {
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
                    events: [...this.state.events, body],
                    visible2: false
                });
            }
        });
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
    handleDiarySubmit = () => {
        const title = this.refs.diaryTitle.input.value;
        const text = this.refs.diaryText.textAreaRef.value;
        const body = {
            title: title,
            text: text,
            poster: this.state.poster
        };
        fetch(`${config.server}/manage/diary`, {
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
                    diaries: [...this.state.diaries, body],
                    visible1: false
                });
            }
        });
    }
    handleDeleteDiary = (id) => {
        fetch(`${config.server}/manage/diary/${id}`, {
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
                const diaries = this.state.diaries.filter(diary => diary.id !== id);
                this.setState({
                    diaries: diaries,
                    visible1: false
                });
            }
        });
    }
    handleDeleteEvent = (id) => {
        fetch(`${config.server}/manage/event/${id}`, {
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
                const events = this.state.events.filter(event => event.id !== id);
                this.setState({
                    events: events,
                    visible2: false
                });
            }
        });
    }
    componentDidMount = () => {
        fetch(`${config.server}/diaries`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(json => {
                if (json && !json.err) {
                    this.setState({
                        diaries: [...json.diaries]
                    });
                }
            });
        fetch(`${config.server}/events`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(json => {
                if (json && !json.err) {
                    this.setState({
                        events: [...json.events]
                    });
                }
            });
    }
    render() {
        const props = {
            name: 'image',
            action: `${config.server}/api/upload/img`,
            withCredentials: true,
            onChange: ({ file }) => {
                if (file.status === 'done') {
                    const res = file.response;
                    this.setState({
                        poster: res.url
                    });
                }
            },
        };
        const _props = {
            name: 'image',
            action: `${config.server}/api/upload/img`,
            withCredentials: true,
            onChange: ({ file }) => {
                if (file.status === 'done') {
                    const res = file.response;
                    this.setState({
                        eventText: this.refs.eventText.textAreaRef.value += res.url
                    });
                }
            },
        };
        const __props = {
            listType: 'picture-card',
            fileList: this.state.fileList,
            withCredentials: true,
            customRequest: ({ file }) => {
                const body = new FormData();
                body.append('image', file);
                fetch(`${config.server}/api/upload/img`, {
                    method: 'POST',
                    credentials: 'include',
                    body: body
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(json => {
                    if (json && !json.err) {
                        const fileList = this.state.fileList;
                        fileList.push({
                            uid: Math.random(),
                            url: json.url
                        });
                        this.setState({
                            fileList: fileList
                        });
                    }
                });
            },
            onChange: ({ file, fileList }) => {
                if (file.status === 'removed') {
                    this.setState({
                        fileList: fileList
                    });
                }
            }
        };
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
                    <List
                        bordered
                        dataSource={this.state.diaries}
                        renderItem={diary => (
                            <List.Item actions={[
                                <Icon onClick={() => this.handleDeleteDiary(diary.id)} type="delete" />
                            ]}>
                                {diary.title}
                            </List.Item>
                        )}
                    />
                </Card>
                <Modal
                    visible={this.state.visible1}
                    onCancel={this.handleCancel1}
                    onOk={this.handleDiarySubmit}
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
                        <Input ref="diaryTitle" addonBefore="标题" placeholder="标题" />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div>描述</div>
                        <TextArea ref="diaryText" rows={10} />
                    </div>
                </Modal>
                <Card
                    style={{ marginTop: 20 }}
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
                    <List
                        bordered
                        dataSource={this.state.events}
                        renderItem={event => (
                            <List.Item actions={[
                                <Icon onClick={() => this.handleDeleteEvent(event.id)} type="delete" />]
                            }>
                                {event.title}
                            </List.Item>
                        )}
                    />
                </Card>
                <Modal
                    visible={this.state.visible2}
                    onCancel={this.handleCancel2}
                    onOk={this.handleSubmit}
                >
                    <div>
                        <Input ref="eventTitle" addonBefore="标题" placeholder="标题" />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div>正文</div>
                        <Upload
                            {..._props}
                        >
                            <Button type="primary">
                                <Icon type="upload" />
                            </Button>
                        </Upload>
                        <TextArea ref="eventText" rows={10} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div>相关照片</div>
                        <Upload
                            {...__props}
                        >
                            <div>
                                <Icon type="plus" />
                                <div className="ant-upload-text">Upload</div>
                            </div>
                        </Upload>
                    </div>
                </Modal>
            </div>
        );
    }
};