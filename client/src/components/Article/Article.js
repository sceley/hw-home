import React, { Component } from 'react';
import { Layout, Icon, List, Avatar, Button } from 'antd';
import md from '../../common/Markdown';

const { Content, Sider } = Layout;

export default class Article extends Component {

	state = {
		article: ''
	}

	handleSubmit = () => {
		let value = this.editor.getValue();
		console.log(value);
	}

	componentDidMount() {
		let id = this.props.match.params.id;
		fetch(`http://localhost:8080/article/${id}`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json.errorcode === 0) {
				json.article.Body = md(json.article.Body);
				console.log(json);
				this.setState({
					article: json.article
				});
			}
		});
		console.log();
	}

	render() {
		const data = [
			{
				title: 'Ant Design Title 1',
			}
		];
		return (
			<div className="Article" style={{ marginTop: '20px' }}>
				<Layout>
					<Content>
						<h1>HTTPS安全协议</h1>
						<Icon type="calendar" />
						<span>2017-02-10</span>
						<Icon type="user" />
						<span>sceley</span>
						<Icon type="folder" />
						大前端
						<div dangerouslySetInnerHTML={{
							__html: this.state.article.Body
						}}></div>
						<List
							itemLayout="horizontal"
							dataSource={data}
							style={{ marginTop: '20px', background: 'white' }}
							renderItem={item => (
								<List.Item actions={[<Icon type="like-o" />, <Icon type="enter" />]}>
									<List.Item.Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title={<a href="https://ant.design">{item.title}</a>}
										description="Ant Design, a design language for background applications, is refined by Ant UED Team"
									/>
								</List.Item>
							)}
						/>
						<Button type="primary" onClick={this.handleSubmit}>评论</Button>
					</Content>
					<Sider width={300}>
					</Sider>
				</Layout>
			</div>
		);
	}
}