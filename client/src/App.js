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
import Edit from './components/edit';
import Topic from './components/topic';
import Article from './components/article';
import './App.css';
import { Row, Col } from 'antd';

class App extends Component {

  	render() {
    	return (
      		<div className="App">
                <Row type="flex" justify="center">
                    <Col xs={24} sm={23} md={22} lg={21} xl={20}>
                        <Navigation/>
                    </Col>
                    <Col xs={24} sm={23} md={22} lg={21} xl={20}>
                        <Router>
                            <section style={{overflow: 'hidden'}}>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/logup" component={Logup}/>
                                <Route exact path="/member" component={Member}/>
                                <Route exact path="/blog" component={Blog}/>
                                <Route exact path="/community" component={Community}/>
                                <Route exact path="/departments" component={Departments}/>
                                <Route exact path="/resource" component={Resource}/>
                                <Route exact path="/club" component={Club}/>
                                <Route exact path="/event" component={Event}/>
                                <Route exact path="/topic/create" component={TopicCreate}/>
                                <Route exact path="/article/create" component={ArticleCreate}/>
                                <Route exact path="/user" component={User}/>
                                <Route path="/user/edit" component={Edit}/>
                                <Route path="/topic" component={Topic}/>
                                <Route path="/article" component={Article}/>
                            </section>
                        </Router>
                    </Col>
                    <Col xs={24} sm={23} md={22} lg={21} xl={20}>
                        <footer className="footer">©Created By HelloWorld Web Team</footer>
                    </Col>
                </Row>
      		</div>
    	);
 	}
};

export default App;
