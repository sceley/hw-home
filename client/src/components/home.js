import React from 'react';

import { Carousel } from 'antd';
import './home.css';

let Home = () => {
	return (<div className="Home">
			<Carousel autoplay>
			  <div>
			  	<img className="carousel-img-size" src="/img/1.jpg" alt=""/>
			  </div>
			  <div>
			  	<img className="carousel-img-size" src="/img/2.jpg" alt=""/>
			  </div>
			  <div>
			  	<img className="carousel-img-size" src="/img/3.jpg" alt=""/>
			  </div>
			</Carousel>
		</div>);
};
export default Home;