import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Logup from './components/logup';
import Navigation from './components/navigation';
import Member from './components/member';
import Blog from './components/blog';
import TopicCreate from './components/topic-create';
import Community from './components/community';
import Departments from './components/departments';
import Club from './components/club';
import Resource from './components/resource';
import Event from './components/event';
import ArticleCreate from './components/article-create';
import User from './components/user';
import UserInfo from './components/user-info';
import Avatar from './components/avatar';
import Notify from './components/notify';

import './App.css';

import { Row, Col } from 'antd';

class App extends Component {
  	render() {
    	return (
      		<div className="App">
  				<Row type="flex" justify="center">
  					<Col xs={24} sm={23} md={22} lg={21} xl={20}>
						<Navigation/>
          				<Router>
                            <div className="router">
          				        <Route exact path="/" component={Home}/>
          					    <Route path="/login" component={Login}/>
                                <Route path="/logup" component={Logup}/>
                                <Route path="/member" component={Member}/>
                                <Route exact path="/blog" component={Blog}/>
                                <Route path="/community" component={Community}/>
                                <Route path="/departments" component={Departments}/>
                                <Route path="/resource" component={Resource}/>
                                <Route path="/club" component={Club}/>
                                <Route path="/event" component={Event}/>
                                <Route　path="/topic/create" component={TopicCreate}/>
                                <Route path="/article/create" component={ArticleCreate}/>
                                <Route exact path="/user" component={User}/>
                                <Route path="/user/edit/info" component={UserInfo}/>
                                <Route path="/user/edit/avatar" component={Avatar}/>
                                <Route path="/user/edit/notify" component={Notify}/>
                            </div>
          				</Router>
                        <footer style={{padding: '10px 0', color: '001529', textAlign: 'center'}}>©Created By HelloWorld Web Team</footer>
                    </Col>
                </Row>
      		</div>
    	);
 	}
};

export default App;
