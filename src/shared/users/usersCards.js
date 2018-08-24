import React from 'react';
import '../App.css';
import firebaseApp, { goalRef } from '../Firebase/Firebase';
import Msgbox from './msgbox';
import { Panel, Image } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import profileimg from '../profile.jpg';

let userid;
let Data;
class Cards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			box: false,
			username: ''
		}
		this.chatbox = this.chatbox.bind(this);
		this.openmsg = this.openmsg.bind(this);
	}
	componentWillMount() {
		firebaseApp.auth().onAuthStateChanged((user) => {
			if (user) {
				userid = user.uid;
				this.setState({ username: user.displayName });
			}
		});
	}
	chatbox(val) {

		this.setState({ box: val })
	}
	openmsg() {

		this.setState({ box: true })
	}
	render() {
		let boxData;
		let chatuser;
		const data = this.props.userData.map((d, i) => {
			if (d !== userid) {

				boxData = d;
				goalRef.child(boxData).child("username").on('value', (snap) => {
					chatuser = snap.val();
				})
				return (<div key={i} className="cards" onClick={this.openmsg}> <div className="defaultImg">
					<Image className="imgpro" src={profileimg} circle />
				</div>
					<div className="cardname">
						<h4>{chatuser}</h4>
					</div>
				</div>)
			}
		})
		return (
			<div>
				<Panel className="online">
					<Panel.Heading>Active Chats
                </Panel.Heading>
					<Panel.Body className="scrollpanel">
						<Scrollbars >
							{data}
						</Scrollbars>
					</Panel.Body>
				</Panel>
				{this.state.box ? <div><Msgbox boxData={boxData} reclose={this.chatbox} /></div> : null}
			</div>
		);

	}
}




export default Cards;