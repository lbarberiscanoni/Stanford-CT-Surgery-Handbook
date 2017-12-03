import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import * as firebase from "firebase";
import HtmlParser from 'react-native-htmlparser';
import Auth from "./components/Auth";
import Search from "./components/Search";

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
        this.itemsRef = rootRef.child("test");
        let userStatus = firebase.auth().currentUser;
        console.log(userStatus);
        this.state = {
            user: userStatus,
            location: "home",
            stuff: "",
        };
    }

    listenForItems(itemsRef) {
        itemsRef.on("value", (snap) => {
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push( 
                    child.val()
                );
            });

            this.setState({
                stuff: items
            });
        });
    }
        
    componentDidMount() { 
        this.listenForItems(this.itemsRef);
        let user = firebase.auth().currentUser;

        console.log(user);
        if (user) {
            this.setState({ "location": "home" })
        } else {
            this.setState({ "location": "login"})
        }
    }

    render() {
       switch(this.state.location) { 
            case "home":
                let buttons = []
                if (this.state.stuff != "") {
                    this.state.stuff.map((x) => { buttons.push(<Text> { x } </Text>) })
                }

                return (
                    <View style={ styles.container }>
                        <Text>Stanford Handbook </Text>
                        { buttons }
                    </View>
                );
            case "login":
                return(
                    <View style={ styles.container }>
                        <Search />
                    </View>
                )
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
