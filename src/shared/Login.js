import React from 'react';
import './App.css';
import { Panel } from 'react-bootstrap';
import firebaseApp from './Firebase/Firebase';
import history from './history/history';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: "",
        }
    }
    handleemail(e) {
        this.setState({ email: e.target.value });
    }
    handlepassword(e) {
        this.setState({ password: e.target.value });
    }
    send() {
        if (this.state.email && this.state.password) {
            firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(response => {
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
            <Panel className='login'>
                <Panel.Heading>Sign In</Panel.Heading>
                <Panel.Body>
                    <div className='form'>
                        <div id="login">
                            <input type="email" id="email" value={this.state.email} placeholder="Email" onChange={this.handleemail.bind(this)} />
                            <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handlepassword.bind(this)} />
                            <div className="color">{this.state.error}</div>
                            <button id="send" onClick={this.send.bind(this)}>Sign In</button>

                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}

export default Login; 