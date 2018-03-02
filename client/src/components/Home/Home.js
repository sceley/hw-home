import React, { Component } from 'react';
import { Carousel, Col, Row } from 'antd';
import introduction from '../../common/introduction';
import config from '../../config';
import './Home.css';

export default class Home extends Component {
	state = {
		posters: []
	}
	componentDidMount = () => {
		fetch(`${config.server}/homeposters`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					posters: json.posters
				});
			}
		});
	} 
	render() {
		let elements = this.state.posters.map(item => {
			return (
				<div key={item.id} className="carousel-item">
					<img src={item.Poster} alt="" />
				</div>
			);
		});
		const settings = {
			autoplay: true
		};
		return (
			<div className="Home">
				<div className="banner">
					<Carousel {...settings}>
						{ elements }
					</Carousel>
				</div>
				<div className="contact" style={{ marginTop: '20px' }}>
					<Row>
						<Col span={16}>
						</Col>
						<Col span={8}>
							<Row>
								<Col span={12} className="list-item">
									<div className="qr-wrap">
										<img src="/img/ccf.png" alt="" />
									</div>
								</Col>
								<Col span={12} className="list-item">
									<div className="qr-wrap">
										<img src="/img/hw.png" alt="" />
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
				<div className="footer" style={{ marginTop: '20px' }}>
					<Row type="flex" justify="center">
						<Col style={{textAlign: 'center'}} xs={22} md={17} xl={14}>
							<h3>What People Say</h3>
							<p>
								{introduction.community.introduce}
			        		</p>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
};