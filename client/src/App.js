import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Manage from './components/Manage';
import Login from './components/Login';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/manage" component={Manage} />
                        <Redirect from="/" to="/manage" />
                    </Switch>
                </Router>
            </div>
        );
    }
};
export default App;