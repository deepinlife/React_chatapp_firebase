import React from 'react';
import './App.css';
import { Panel, Button } from 'react-bootstrap';
import firebaseApp from './Firebase/Firebase';
import { goalRef } from './Firebase/Firebase';
import history from './history/history';
import Cards from './users/usersCards';

let userId;
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            error: "",
            userData: []
        }
    }
    componentWillMount() {
        this.mount = true;
        firebaseApp.auth().onAuthStateChanged(user => {
            if (this.mount) {
                if (user) {
                    userId = user.uid;
                    goalRef.child(userId).child("status").set("online");
                    goalRef.child(userId).on('value', snap => {
                        this.setState({
                            email: snap.val().email,
                            username: user.displayName
                        })
                    })
                    goalRef.on('value', (snap) => {
                        let pp = [];
                        snap.forEach((kk) => {
                            if (kk.val().status === 'online') {
                                pp.push(kk.key);
                            }
                        })
                        this.setState({ userData: pp });
                    })
                }
                else {
                    this.setState({ error: 'Please Sign in first' })
                }
            }
        })
    }
    componentWillUnmount() {
        this.mount = false;
    }
    signOut() {
        firebaseApp.auth().signOut();
        if (userId) {
            goalRef.child(userId).child("status").set("offline");
        }
        history.push('/');
    }
    render() {
        return (
            <div>
                <Panel className="home">
                    <Panel.Heading>User Profile
                </Panel.Heading>
                    <Panel.Body>
                        <div className="color"> {this.state.error}</div>
                        <div className='form'>
                            Welcome:
                        <h4>
                                {this.state.username}
                            </h4>

                            <Button id="signout" bsStyle='danger' onClick={this.signOut.bind(this)}>Sign Out</Button>
                        </div>
                    </Panel.Body>
                </Panel>
                <Cards userData={this.state.userData} />
            </div>
        );
    }
}

export default Home;