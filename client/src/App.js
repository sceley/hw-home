import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Logup from './components/logup';
import Navigation from './components/navigation';

import logo from './logo.svg';
import './App.css';


import 'antd/dist/antd.css'; 
import { Breadcrumb, Icon, Row, Col } from 'antd';


class App extends Component {
  	render() {
    	return (
      		<div className="App">
  				<Row>
  					<Col span={18} offset={3}>
  						<Row>
  							{/*<Col className="logo" span={1}>
  								hw
  							</Col>*/}
  							<Col span={22} offset={2}>
  								<Navigation/>
                  				<Router>
                                    <div className="router">
                  				        <Route exact path="/" component={Home}/>
                  					    <Route path="/login" component={Login}/>
                                        <Route path="/logup" component={Logup}/>
                                    </div>
                  				</Router>
                                <div className="footer">
                                    @
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
      		</div>
    	);
 	}
};

export default App;
