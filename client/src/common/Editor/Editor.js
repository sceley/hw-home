import React, { Component } from 'react';
import { Icon, Modal, Upload, Button, Input } from 'antd';
import CodeMirror from 'codemirror';
import config from '../../config';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/keymap/vim.js';
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/theme/shadowfox.css';
import './Editor.css';
export default class Editor extends Component {
	state = {
		imgVisible: false,
		linkVisible: false
	}
	componentDidMount = () => {
		this.editor = CodeMirror.fromTextArea(this.refs.editor, {
			lineNumbers: true,
			mode: 'markdown',
			keyMap: 'vim',
			theme: 'shadowfox',
			extraKeys: {
				"F11": function (cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function (cm) {
					if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
				}
			}
		});
	}
	getValue = () => {
		return this.editor.getValue();
	}
	setValue = value => {
		this.editor.setValue(value);
	}
	showImgModal = () => {
		this.setState({
			imgVisible: true
		});
	}
	showLinkModal = () => {
		this.setState({
			linkVisible: true
		});
	}
	handleCancel = () => {
		this.setState({
			imgVisible: false
		});
	}
	handlelinkCancel = () => {
		this.setState({
			linkVisible: false
		});
	}
	handleOk = () => {
		let Title = this.refs.Title.input.value;
		let Link = this.refs.Link.input.value;
		this.setState({
			linkVisible: false
		});
		let data = this.getValue() + `[${Title}](${Link})`;
		this.setValue(data);
	}
	handleUpload = (e) => {
		let body = new FormData();
		body.append('image', e.file);
		fetch(`${config.server}/user/upload`, {
			method: 'POST',
			credentials: 'include',
			body: body
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (!json.err) {
				this.setState({
					imgVisible: false
				});
				let data = this.getValue() + `![${e.file.name}](${json.url})`;
				this.setValue(data);
			}
		});
	}

	render () {
		return (
			<div className="Editor">
				<ul className="editor-tool-bar">
					<li className="item">
						<a onClick={this.showImgModal}>
							<Icon type="picture"/>
						</a>
						<em className="action-split"/>
					</li>
					<li className="item">
						<a onClick={this.showLinkModal}>
							<Icon type="link" />
						</a>
					</li>
				</ul>
				<Modal
					title="图片上传"
					visible={this.state.imgVisible}
					onCancel={this.handleCancel}
					footer={null}
					bodyStyle={{textAlign: 'center'}}
		        >
					<Upload
						accept="image/*"
						customRequest={this.handleUpload}
						showUploadList={false}
					>
						<Button>
							<Icon type="upload" />上传图片
						</Button>
					</Upload>
		        </Modal>
        		<Modal
        			title="添加标题"
        			visible={this.state.linkVisible}
        			onCancel={this.handlelinkCancel}
        			onOk={this.handleOk}
        			bodyStyle={{textAlign: 'center'}}
        			okText="确定"
                >
        			<Input ref="Title" addonBefore="标题"/>
        			<Input ref="Link"　style={{marginTop: '20px'}} addonBefore="链接"/>
                </Modal>
				<textarea ref="editor"></textarea>
			</div>
		);
	}
}