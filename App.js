import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import * as firebase from "firebase";
import HtmlParser from 'react-native-htmlparser';
import Section from "./Section";
//import Auth from "./components/Auth";
//import Search from "./components/Search";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCVj9ZWunoXIGOT08Qw8XF9qiS_TTnsP8A",
    authDomain: "stanford-heart-surgery.firebaseapp.com",
    databaseURL: "https://stanford-heart-surgery.firebaseio.com",
    projectId: "stanford-heart-surgery",
    storageBucket: "stanford-heart-surgery.appspot.com",
    messagingSenderId: "856277829656"
};
firebase.initializeApp(config);

// Create a reference with .ref() instead of new Firebase(url)

export default class App extends React.Component {

    constructor() {
        super();
        let rootRef = firebase.database().ref();
        this.itemsRef = rootRef;
        //let userStatus = firebase.auth().currentUser;
        //console.log(userStatus);
        this.state = {
            //user: userStatus,
            location: "home",
            table_of_contents: {"test": ["a","b"]}
        };
    }

    listenForItems(itemsRef) {
        itemsRef.on("value", (snap) => {
            // get children as an array

			let items = {}
			snap.forEach((child) => {
				items[child.key] = []
				child.forEach((grandChild) => {
					items[child.key].push(grandChild.key)
				})
			})

            this.setState({
                "table_of_contents": items
            });
        });
    }
        
    componentWillMount() { 
        this.listenForItems(this.itemsRef);
        //let user = firebase.auth().currentUser;

        //console.log(user);
        //if (user) {
        //    this.setState({ "location": "home" })
        //} else {
        //    this.setState({ "location": "login"})
        //}
    }

    render() {
		let components = []
		Object.keys(this.state.table_of_contents).map((key) => {
			components.push(<Section area={ key } sections={ this.state.table_of_contents[key]} />)
		});

		switch(this.state.location) { 
			case "home":
				return(
					<View>
						{ components }
					</View>
				)
				break;
		}
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
