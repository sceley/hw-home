import React, { Component } from 'react';
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
	getValue = () => {
		return this.editor.getValue();
	}
	setValue = value => {
		this.editor.setValue(value);
	}
	render () {
		return (
			<div className="Editor">
				<textarea ref="editor"></textarea>
			</div>
		);
	}
}