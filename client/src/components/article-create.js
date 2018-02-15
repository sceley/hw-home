
import React, { Component } from 'react';

import Mnav from './mnav';
import Editor from './editor';
import { Button, Input, Upload, Icon } from 'antd';
import './article-create.css';

export default class ArticleCreate extends Component {

	handleCancel = () => {

	}

	handleSubmit = () => {

	}

	handleChange = (e) => {
		console.log(e);
	}

	handleImgSubmit = (e) => {
		console.log(e);
	}

	render () {
		return (
				<div className="ArticleCreate">
					<Mnav name="发表文章"/>
					<div style={{ marginTop: '20px' }}>
						<h1 style={{ textAlign: 'center' }}>创作文章</h1>
		            	<Input ref="blogInput" placeholder="请填写标题" />
		            	<div>
		            		封面
		            	</div>
		            	<Upload
		            		customRequest={this.handleImgSubmit}
		            		accept="image"
		            		showUploadList={false}
		            		onChange={this.handleChange}
		            	>
							<Button>
								<Icon type="upload" /> 上传封面
							</Button>
		            	</Upload>
						<Editor handleSubmit={this.handleSubmit}/>
						<div style={{textAlign: 'center'}}>
							<Button type="primary">提交</Button>
						</div>
					</div>
				</div>
			);
	}
}