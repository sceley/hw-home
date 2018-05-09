import React, { Component } from 'react';
import { Card, Upload, Icon, Button, Row, Col, Carousel, Modal, Input } from 'antd';
import config from '../config';
const { Meta } = Card;
const { TextArea } = Input;

export default class ManageHome extends Component {
	state = {
		visible: false,
		banners: []
	}
	componentDidMount = () => {
		fetch(`${config.server}/api/banners`)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then(json => {
			if (json && !json.err) {
				this.setState({
					banners: [...this.state.banners, ...json.banners]
				});
			}
		});
	}
	showModal = () => {
		this.setState({
			visible: true
		})
	}
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
	deleteBanner = () => {

	} 
	render () {
		const props = {
			name: 'image',
			action: `${config.server}/api/banner/upload`,
			onChange(info) {
				
			},
		};
		const data = [{
			url: 'http://www.hdu-helloworld.club/_nuxt/img/bg1.4034547.jpg',
			id: 1
		}, {
				url: 'http://www.hdu-helloworld.club/_nuxt/img/bg1.4034547.jpg',
				id: 2
			}];
		const banners = data.map(item => (
			<div key={item.id} className="banner-item">
				<div style={{ textAlign: 'center' }}>
					<a href="javascript:;"><Icon type="delete" /></a>
				</div>
				<img src={item.url} alt="" />
			</div>
		));
		return (
			<div className="Banner Container">
				<Card
					title={
						<div>
							Banner编辑
							<div style={{float: 'right'}}>
								<Upload
									{...props}
								>
									<Button type="primary">
										<Icon type="upload" />
									</Button>
								</Upload>
							</div>
						</div>
					}
				>
					<Carousel>
						{ banners }
					</Carousel>			
				</Card>
				<Card
					style={{marginTop: 20}}
					title={
						<div>
							近期事件编辑编辑
							<div style={{ float: 'right' }}>
								<Button onClick={this.showModal} type="primary">
									<Icon type="plus" />
								</Button>
							</div>
						</div>
					}
				>
					<Row gutter={16}>
						<Col span={8}>
							<Card
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
								actions={[<Icon type="delete" />, <Icon type="edit" />]}
							>
								2018 Hack  Hackathon大赛，程序员们以项目为出发点，相聚在一起，在24h的时间内，以你们想要的方式，去做你们想做的事情——整个编程的过程几乎没有任何限制或者方向。这是一个可以彻底头脑风暴的机会，但更重要的是，你能否把你的奇思妙想，Make it come true? 2018 Hack，等你来实现。
							</Card>
						</Col>
						<Col span={8}>
							<Card
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
								actions={[<Icon type="delete" />, <Icon type="edit" />]}
							>

							</Card>
						</Col>
						<Col span={8}>
							<Card
								cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
								actions={[<Icon type="delete" />, <Icon onClick={this.showModal} type="edit" />]}
							>

							</Card>
						</Col>
					</Row>
					<Modal
						visible={this.state.visible}
						onCancel={this.handleCancel}
						cancelText="取消"
						okText="确定"
					>
						<div>
							<div>海报</div>
							<Upload
								{...props}
							>
								<Button type="primary">
									<Icon type="upload" />
								</Button>
							</Upload>
						</div>
						<div style={{ marginTop: 20 }}>
							<div>文字描述</div>
							<TextArea rows={6} />
						</div>
					</Modal>
				</Card>
			</div>
		);
	}
};