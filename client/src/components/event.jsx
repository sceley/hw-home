import React, { Component } from 'react';

import Mnav from './mnav';
export default class Event extends Component {
	render () {
		return (
				<div className="Event">
					<Mnav name="近期事件"/>
				</div>
			);
	}
}