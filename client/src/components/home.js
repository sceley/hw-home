import React, { Component } from 'react';

import { Carousel, Col, Row, Icon } from 'antd';
import './home.css';


export default class Home extends Component {
	render () {
		console.log(this.props);
		const settings = {
			autoplay: true
		};
		return (
				<div className="Home">
					<Carousel {...settings}>
						<div className="carousel-item">
							<img src="/img/2.jpg" alt=""/>
						</div>
						<div className="carousel-item">
							<img src="/img/3.jpg" alt=""/>
						</div>
			        </Carousel>
			        <div style={{ background: 'white', marginTop: '20px', padding: '30px 0' }}>
						<Row>
							<Col xs={24} md={{span: 12}} xl={{span: 10}}>
							</Col>
							<Col xs={24} md={{span: 10, offset: 2}} xl={{span: 8, offset: 6}} style={{background: '#ECECEC', padding: '20px 0px'}}>
								<Row type="flex" justify="space-around">
									<Col xs={11} xl={10}>
										<img style={{ width: "100%" }} src="/img/ccf.png" alt=""/>
									</Col>
									<Col xs={11} xl={10}>
										<img style={{ width: "100%" }} src="/img/hw.png" alt=""/>
									</Col>
								</Row>
							</Col>
						</Row>
			        </div>
			        <div style={{textAlign: 'center', color: 'white', marginTop: '20px', background: '#4c4f53', padding: '20px'}}>
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