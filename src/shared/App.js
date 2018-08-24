import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.css';
import history from './history/history';


export default class App extends Component {

    signUp() {
        history.push('/signup');
    }
    login() {
        history.push('/login');
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <div>
                        <Route path='/login' component={Login} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/home' component={Home} />
                        <Navbar fixedTop>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="/">
                                        Our Awesome App
                                </a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav pullRight>
                                    <NavItem onClick={this.login.bind(this)}
                                        eventKey={1}>
                                        Login
                                </NavItem>
                                    <NavItem onClick={this.signUp.bind(this)}
                                        eventKey={2} >
                                        SignUp
                               </NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </Switch>
            </Router>
        );
    }
}