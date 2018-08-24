import React from 'react';
import { Panel } from 'react-bootstrap';
import './App.css';
import firebaseApp from './Firebase/Firebase';
import { goalRef } from './Firebase/Firebase';
import history from './history/history';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            error: "",
            send: false
        }
    }
    handleusername(e) {
        this.setState({ username: e.target.value });
    }
    handleemail(e) {
        this.setState({ email: e.target.value });
    }
    handlepassword(e) {
        this.setState({ password: e.target.value });
    }
    send() {
        if (this.state.username && this.state.email && this.state.password) {
            firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(response => {
                const userId = response.user.uid;
                const newPost = goalRef.child(userId);
                newPost.child('email').set(this.state.email);
                newPost.child('username').set(this.state.username);
                response.user.updateProfile({
                    displayName: this.state.username
                })
                history.push('/home');
            })
                .catch(error => {
                    this.setState({ error: error.message })
                })
        }
        else {
            this.setState({ error: "All field all mandatory" })
        }
    }

    render() {
        return (
            <Panel className="signup">
                <Panel.Heading>Sign Up</Panel.Heading>
                <Panel.Body>
                    <div className="form">
                        <div id="signup">
                            <input type="Username" id="username" value={this.state.username} placeholder="Username" onChange={this.handleusername.bind(this)} />
                            <input type="email" id="email" value={this.state.email} placeholder="Email" onChange={this.handleemail.bind(this)} />
                            <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handlepassword.bind(this)} />
                            <div className="color">{this.state.error}</div>
                            <button id="send" onClick={this.send.bind(this)}>Sign Up</button>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}

export default Signup;