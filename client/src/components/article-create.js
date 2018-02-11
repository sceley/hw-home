import React, { Component } from 'react';

import Mnav from './mnav';

export default class ArticleCreate extends Component {
	render () {
		return (
				<div className="ArticleCreate">
					<Mnav name="发表文章"/>
					<h1>创作文章</h1>
				</div>
			);
	}
}