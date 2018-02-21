import React, { Component } from 'react';
import { Upload, Button, Icon, Modal } from "antd";

import Mde, { ReactMdeCommands } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'font-awesome/css/font-awesome.css';

const ReactMdeTextHelper = require('react-mde/lib/js/helpers/ReactMdeTextHelper.js');

export default class Editor extends Component {
	state = {
		reactMdeValue: { text: '', selection: null },
		ModalText: 'Content of the modal',
		visible: false,
		confirmLoading: false,
	}

	handleValueChange = (value) => {
		this.setState({ reactMdeValue: value });
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	handleOk = () => {
		this.setState({
			ModalText: 'The modal will be closed after two seconds',
			confirmLoading: true,
		});
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false,
			});
		}, 2000);
	}

	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
			visible: false,
		});
	}

	render() {
		const { visible, confirmLoading } = this.state;
		const makeSendCommand = {
			icon: 'send',
			tooltip:
			'send',
			execute:
			(text, selection) => {
				this.props.handleSubmit(this.state.reactMdeValue);
				return {
					text: text,
					start: selection.end,
					end: selection.start
				};
			},
		};

		const ImageCommand = {
			icon: 'picture-o',
			tooltip: "Insert a picture",
			execute: (text, selection) => {
				this.showModal();
				var _a = ReactMdeTextHelper.insertText(text, "![", selection.start),
					newText = _a.newText,
					insertionLength = _a.insertionLength;
				var finalText = ReactMdeTextHelper.insertText(newText, "](image-url)", selection.end + insertionLength).newText;
				return {
					text: finalText,
					selection: {
						start: selection.start + insertionLength,
						end: selection.end + insertionLength,
					},
				};
			},
		};
		let commands = [...ReactMdeCommands.getDefaultCommands(), [makeSendCommand]];
		commands[1][3] = ImageCommand;
		return (
			<div>
				<Mde
					textAreaProps={{
						id: 'code',
						name: 'code',
					}}
					value={this.state.reactMdeValue}
					onChange={this.handleValueChange}
					commands={commands}
				/>
				<Modal title="上传图片"
					visible={visible}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					footer={null}
					style={{ textAlign: 'center' }}
				>
					<Upload>
						<Button>
							<Icon type="upload" /> Click to Upload
					    </Button>
					</Upload>
				</Modal>
			</div>
		);
	}
}