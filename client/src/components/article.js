import React, { Component } from 'react';
import { Layout, Icon, List, Avatar, Button } from 'antd';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/keymap/vim.js';
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/theme/shadowfox.css';

const { Content, Sider } = Layout;

export default class Article extends Component {

	handleSubmit = () => {
		let value = this.editor.getValue();
		console.log(value);
	}

	componentDidMount () {
		console.log(this.refs.codeditor);
		this.editor = CodeMirror.fromTextArea(this.refs.codeditor, {
			lineNumbers: true,
			mode: 'markdown',
			keyMap: 'vim',
			theme: 'shadowfox',
			extraKeys: {
			    "F11": function(cm) {
			      cm.setOption("fullScreen", !cm.getOption("fullScreen"));
			    },
			    "Esc": function(cm) {
			      if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
			    }
			}
		});
	}

	render () {
		const data = [
		  {
		    title: 'Ant Design Title 1',
		  },
		  {
		    title: 'Ant Design Title 2',
		  },
		  {
		    title: 'Ant Design Title 3',
		  },
		  {
		    title: 'Ant Design Title 4',
		  },
		];
		return (
			<div className="Article" style={{marginTop: '20px'}}>
				<Layout>
					<Content>
						<h1>HTTPS安全协议</h1>
						<Icon type="calendar" />
						<span>2017-02-10</span>
						<Icon type="user" />
						<span>sceley</span>
						<Icon type="folder" />
						大前端

						<List
						    itemLayout="horizontal"
						    dataSource={data}
						    style={{marginTop: '20px', background: 'white'}}
						    renderItem={item => (
						      <List.Item  actions={[<Icon type="like-o" />, <Icon type="enter" />]}>
						        <List.Item.Meta
						          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
						          title={<a href="https://ant.design">{item.title}</a>}
						          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
						        />
						      </List.Item>
						    )}
						/>
						<textarea style={{background: "white"}} ref="codeditor"></textarea>
						<Button type="primary" onClick={this.handleSubmit}>评论</Button>
					</Content>
					<Sider width={300}>
					</Sider>
				</Layout>
			</div>
		);
	}
}