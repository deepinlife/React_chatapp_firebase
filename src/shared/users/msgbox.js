import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import firebaseApp from '../Firebase/Firebase';
import { goalRef } from '../Firebase/Firebase';
import { Scrollbars } from 'react-custom-scrollbars';

let userid;
class Msgbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            box: "visible",
            user2: "",
            message: '',
            bundle: [{}],
        }
    }

    componentWillMount() {
        this.mount = true;
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user && this.mount) {
                userid = user.uid;
                goalRef.child("message").child(userid).child(this.props.boxData).on('value', (snap) => {
                    if (snap.exists()) {
                        this.setState({
                            bundle: snap.val(),
                        });
                    }
                })
                goalRef.child(this.props.boxData).on('value', snap => {
                    this.setState({
                        user2: snap.val().username,
                    });
                })

            }
        });
    }
    componentWillUnmount() {
        this.mount = false;
    }
    handlemsg(e) {
        this.setState({
            message: e.target.value,
        });
    }
    handlesend() {
        const { message, bundle } = this.state;
        ReactDOM.findDOMNode(this.refs.messageref).value = '';
        if (message && this.props.boxData) {
            bundle.push({
                message,
                from: userid
            })
            goalRef.child("message").child(userid).child(this.props.boxData).set(bundle);
            goalRef.child("message").child(this.props.boxData).child(userid).set(bundle);
        }

    }
    closeChat() {
        this.props.reclose(false);
        this.setState({ box: "none" });

    }
    render() {
        let side;
        let msgside;
        if (!this.props.boxData) {
            this.props.reclose(false);
        }
        return (
            <div className={this.state.box}>
                <div className="mheader">
                    <div className="leftName">{this.state.user2}</div>
                    <div className="rightclose">
                        <button type="button" className="close " aria-label="Close"
                            onClick={this.closeChat.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div className="mbody">
                    <Scrollbars  >
                        {this.state.bundle.map((j, k) => {
                            if (j.from === userid) {
                                side = 'ah5';
                                msgside = 'ua';
                            } else {
                                side = "bh5";
                                msgside = 'ub';
                            }
                            return (<div key={k} className={msgside}>
                                <h5 className={side} >{j.message}</h5>
                            </div>)
                        })
                        }
                    </Scrollbars>
                </div>
                <div className="mfooter">
                    <input type="message" id="msg" ref='messageref' value={this.state.message} placeholder="Message" onChange={this.handlemsg.bind(this)} />
                    <button className="send" onClick={this.handlesend.bind(this)} ></button>
                </div>
            </div>
        )
    }
}
export default Msgbox;