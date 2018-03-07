import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Icon } from 'antd';
import BreadCrumb from '../../common/BreadCrumb/BreadCrumb';
import config from '../../config';

const { Meta } = Card;

export default class Event extends Component {
	state = {
		events: []
	}
	componentWillMount = () => {
		fetch(`${config.server}/event`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					events: json.events
				});
			}
		});
	}
	render() {
		let events = this.state.events.map(event => {
			return <Col key={event.Title} span={8}>
						<Link to={`/event/${event.id}`}>
							<Card
								cover={<img alt="example" src={event.Poster} />}
							>
								<Meta
									title={event.Title}
								/>
							</Card>
						</Link>
					</Col>
		});
		return (
			<div className="Event">
				<BreadCrumb name="近期事件" />
				<div style={{ marginTop: '20px', textAlign: 'center' }}>
					<Icon style={{fontSize: '2em'}} type="tags" />
					<h2>近期事件</h2>
				</div>
				<div style={{ marginTop: '20px' }}>
					<Row gutter={16}>
						{ events }
					</Row>
				</div>
			</div>
		);
	}
}