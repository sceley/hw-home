import React, { Component } from 'react';
import { Carousel, Col, Row, Icon, Layout } from 'antd';
import './Home.css';

const { Content, Sider } = Layout;

export default class Home extends Component {

	render() {
		console.log(this.state);
		const settings = {
			autoplay: true
		};
		return (
			<div className="Home">
				<Carousel {...settings}>
					<div className="carousel-item">
						<img src="http://ozkbfywab.bkt.clouddn.com/luBlz_8-moEhhpUGebfO4PL6alg9" alt="" />
					</div>
					<div className="carousel-item">
						<img src="http://ozkbfywab.bkt.clouddn.com/FvrQpeSd7-I6LPm4fMJzFGt8EJKB" alt="" />
					</div>
					<div className="carousel-item">
						<img src="http://ozkbfywab.bkt.clouddn.com/FiBRevSslENTiTPP1gUjjbD5hGEs" alt="" />
					</div>
				</Carousel>
				<Layout className="contact" style={{ marginTop: '20px' }}>
					<Content>
					</Content>
					<Sider>
						<img src="/img/ccf.png" alt="" />
						<img src="/img/hw.png" alt="" />
					</Sider>
				</Layout>
				<div style={{ marginTop: '20px' }}>
					<Row type="flex" justify="center">
						<Col xs={22} md={17} xl={12}>
							<Icon type="message" />
							<h3>What People Say</h3>
							<p>
								Hello World(简称HW) 计算机学院的技术販务类社团，所谓的技术就是指计算机语言编程、网站及依倍平台开发等，而服务就是指HW的运作对象是校内社团和校外坦织，例如为校夕司量身定做软件、管理和维护微倍订阅号等。在这里，你可以接触到M从杭电毕业而工作在HW的计算机技术大神，提早认知毕业之后的就业方向与形势，并且提离自身技术素养，而且还有计算机学院的老师亲自传授计算机技术哦！
			        			</p>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
};