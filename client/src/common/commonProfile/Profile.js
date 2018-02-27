import React, { Component } from 'react';
import { Icon, Divider, Avatar } from 'antd';
export default class CommonProfile extends Component {
	render () {
		return (
			<div　className="CommonProfile">
				<a href={`/user/${this.props.user.id}`}>
					{
						this.props.user && this.props.user.Avatar ?
							<img src={this.props.user.Avatar} alt="avatar" className="img-thumbnail avatar" />
							:
							<Avatar style={{ backgroundColor: '#87d068' }} size="large" icon="user" />
					}
				</a>
				<h1>{ this.props.user && this.props.user.Username }</h1>
					{
						this.props.user && this.props.user.Sex == "woman" ?
						<Icon type="woman" />:<Icon type="man" />
					}
				<p><em>{ this.props.user && this.props.user.Introduction }</em></p>
				<ul className="icon-list">
					{
						this.props.user && this.props.user.Location ? 
						<li><Icon type="environment" /><em style={{fontSize: '10px'}}>{this.props.user.Location}</em></li>
						:null
					}
				</ul>
				<ul className="icon-list icon-list-link">
					{
						this.props.user && this.props.user.Github ?
						<li><a href={`https://github.com/${this.props.user.Github}`}><Icon type="github" /></a></li>
						:null
					}
					{
						this.props.user && this.props.user.Website ?
						<li><a href={this.props.user.Website}><Icon type="global" /></a></li>
						:null
					}
				</ul>
				<Divider />
			</div>
		)
	}
}