import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logup from './components/Logup/Logup';
import Nav from './components/Nav/Nav';
import Member from './components/Member/Member';
import Blog from './components/Blog/Blog';
import CreateTopic from './components/CreateTopic/CreateTopic';
import Community from './components/Community/Community';
import Department from './components/Department/Department';
import Club from './components/Club/Club';
import Resource from './components/Resource/Resource';
import Events from './components/Event/Events';
import Event from './components/Event/Event';
import CreateArticle from './components/CreateArticle/CreateArticle';
import User from './components/User/User';
import EditNav from './components/EditNav/EditNav';
import Topic from './components/Topic/Topic';
import Article from './components/Article/Article';
import Admin from './components/Admin/Admin';
import AdminLogin from './components/Admin/AdminLogin';
import Message from './components/Message/Message';
import NotFound from './components/NotFound/NotFound';
import { Row, Col } from 'antd';
import './App.css';

class App extends Component {
    state = {
        user: ''
    }
    deliver = (user) => {
        this.setState({
            user: user
        });
    }
    render() {
        return (
            <div className="App">
                <Router>
                    <section style={{ overflow: 'hidden' }}>
                        <Row className="nav" type="flex" justify="center">
                            <Col xs={24} sm={23} md={22} lg={21} xl={20}>
                                <Nav/>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center">
                            <Col xs={24} sm={23} md={22} lg={21} xl={20}>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route deliver={this.deliver} exact path="/login" component={Login} />
                                    <Route exact path="/logup" component={Logup} />
                                    <Route exact path="/member" component={Member} />
                                    <Route exact path="/blog" component={Blog} />
                                    <Route exact path="/community" component={Community} />
                                    <Route exact path="/department" component={Department} />
                                    <Route exact path="/resource" component={Resource} />
                                    <Route exact path="/club" component={Club} />
                                    <Route exact path="/events" component={Events} />
                                    <Route exact path="/create/topic" component={CreateTopic} />
                                    <Route exact path="/topic/:id" component={Topic} />
                                    <Route exact path="/article/:id" component={Article} />
                                    <Route exact path="/create/article" component={CreateArticle} />
                                    <Route exact path="/admin/login" component={AdminLogin}/>
                                    <Route exact path="/event/:id" component={Event}/>
                                    <Route path="/user/edit" component={EditNav} />
                                    <Route path="/admin/manage" component={Admin}/>
                                    <Route path="/message" component={Message}/>
                                    <Route path="/user/:id" component={User} />
                                    <Redirect from="/admin" to="/admin/manage"/>
                                    <Route path="*" component={NotFound} />
                                </Switch>
                            </Col>
                            <Col xs={24} sm={23} md={22} lg={21} xl={20}>
                                <footer className="extra">©Created By HelloWorld Web Team</footer>
                            </Col>
                        </Row>
                    </section>
                </Router>
            </div>
        );
    }
};
export default App;