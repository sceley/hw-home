import React, { Component } from 'react';
import { Upload, Button, Icon, Modal } from "antd";
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/keymap/vim.js';
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/theme/shadowfox.css';

export default class Editor extends Component {
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
	
	render () {
		return (
			<div className="Editor">
				<ul className="editor-tool-bar">
					<li>
						发送
						<em className="action-split"/>
					</li>
					<li></li>
				</ul>
				<textarea ref="editor"></textarea>
			</div>
		);
	}
}