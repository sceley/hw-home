import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './BreadCrumb.css';

export default (props) => (
	<div className="BreadCrumb">
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to="/">首页</Link>
			</Breadcrumb.Item>
			<Breadcrumb.Item>{props.name}</Breadcrumb.Item>
		</Breadcrumb>
	</div>
)