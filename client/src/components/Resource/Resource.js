import React, { Component } from 'react';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';

export default class Resource extends Component {
	render() {
		return (
			<div className="Resource">
				<BreadCrumb name="技术资源" />
			</div>
		);
	}
}