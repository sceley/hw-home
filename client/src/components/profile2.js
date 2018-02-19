import React, { Component } from 'react';
import { Icon, Divider } from 'antd';

export default class Profile2 extends Component {

	render () {
		return (
			<div className="Profile2">
				<a href="">
					<img src="https://avatars1.githubusercontent.com/u/23139022?v=4&s=120" className="img-thumbnail avatar"/>
				</a>
				<h2>sceley</h2>
					<Icon type="man" />
				<p>颠三倒四多翁</p>
				<ul>
					<li><Icon type="environment-o" /></li><br/>
					<li><Icon type="github" /></li>
					<li><Icon type="global" /></li>
				</ul>
				<Divider />
				<Divider />
				<div>
				</div>
			</div>
		);
	}
}