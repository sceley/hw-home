import React from 'react';

import { Breadcrumb } from 'antd';
import './BreadCrumb.css';

export default (props) => (
	<div className="Mnav">
		<Breadcrumb>
			<Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
			<Breadcrumb.Item>{props.name}</Breadcrumb.Item>
		</Breadcrumb>
	</div>
)