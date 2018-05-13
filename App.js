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
            location: "lol",
            table_of_contents: {"test": {"a": {"content": ""}, "b": {"content": ""}}}
        };
    }

    listenForItems(itemsRef) {
        itemsRef.once("value").then((snap) => {
            let navList = snap.val()[0]["Table Of Contents"]

            this.setState({
                "table_of_contents": navList
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

    makeNav(ob) {
        let components = []
        Object.keys(ob).map((key) => {
            if (key != "content") {
                let component = <Section name={ key }> { this.makeNav(ob[key]) } </Section>
                console.log(component)
                components.push(component)
            }
        })

        return(components)
    }

    render() {
        switch(this.state.location) { 
			case "home":
				return(
					<View style={ styles }>
                        <Text>Hello </Text>
                        <Text>Hello </Text>
                        { this.makeNav(this.state.table_of_contents) }
					</View>
				)
				break;
            case "lol":
                return(
                    <HtmlParser containerStyle={{}} tagsStyle={{}} html={'<div class=\"t m0 xbf h8 yd3 ff4 fs6 fc1 sc0 ls0 ws0\">Indications f<span class=\"_ _0\"></span>or bronchoscopy:</div><div class=\"t m0 xbb hb yd4 ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 yd5 ff2 fs3 fc0 sc0 ls0 ws0\">Hypoxemia</div><div class=\"t m0 xbb hb y1549 ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 y154a ff2 fs3 fc0 sc0 ls0 ws0\">Suspected airway obstruc<span class=\"_ _0\"></span>tion</div><div class=\"t m0 xbb hb y154b ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 y154c ff2 fs3 fc0 sc0 ls0 ws0\">New CXR opacity</div><div class=\"t m0 xbb hb y154d ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 y154e ff2 fs3 fc0 sc0 ls0 ws0\">Copious secretions</div><div class=\"t m0 xbb hb y154f ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 y1550 ff2 fs3 fc0 sc0 ls0 ws0\">T<span class=\"_ _0\"></span>o obt<span class=\"_ _1\"></span>ain Bronchial Alveolar Lavag<span class=\"_ _0\"></span>e (BAL)/sputum culture</div><div class=\"t m0 xbb hb y1551 ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 y1552 ff2 fs3 fc0 sc0 ls0 ws0\">Pulmonar<span class=\"_ _a\"></span>y toile<span class=\"_ _0\"></span>ting</div><div class=\"t m0 xbf h8 y1553 ff4 fs6 fc1 sc0 ls0 ws0\">Set<span class=\"_ _0\"></span>ting up a bronchoscopy:</div><div class=\"t m0 xbb hb y1554 ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 y1555 ff2 fs3 fc0 sc0 ls0 ws0\">Discuss with at<span class=\"_ _1\"></span>tending on ideal time and indic<span class=\"_ _0\"></span>ation</div><div class=\"t m0 xbb hb y1556 ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 y1557 ff2 fs3 fc0 sc0 ls0 ws0\">Decide bronchoscope (full c<span class=\"_ _0\"></span>art) vs ambuscope (smaller screen, smaller </div><div class=\"t m0 xbc h4 y1558 ff2 fs3 fc0 sc0 ls0 ws0\">scope)</div><div class=\"t m0 xbd h4 y1559 ffa fs8 fc1 sc0 ls0 ws0\"><span class=\"_ _87\"></span><span class=\"_ _88\"> </span><span class=\"ff2 fs3 fc0\">Full cart br<span class=\"_ _0\"></span>onchoscope indicated f<span class=\"_ _1\"></span>or<span class=\"_ _a\"></span>:</span></div><div class=\"t m0 xc0 h25 y155a ff2 fs19 fc1 sc0 ls0 ws0\"> <span class=\"_ _b7\"></span><span class=\"ffa\"></span></div><div class=\"t m0 x23 h4 y155b ff2 fs3 fc0 sc0 ls0 ws0\">Thick secretions, c<span class=\"_ _0\"></span>opious secretions</div><div class=\"t m0 xc0 h25 y155c ff2 fs19 fc1 sc0 ls0 ws0\"> <span class=\"_ _b7\"></span><span class=\"ffa\"></span></div><div class=\"t m0 x23 h4 y155d ff2 fs3 fc0 sc0 ls0 ws0\">Copious bloody secretions</div><div class=\"t m0 xc0 h25 y155e ff2 fs19 fc1 sc0 ls0 ws0\"> <span class=\"_ _b7\"></span><span class=\"ffa\"></span></div><div class=\"t m0 x23 h4 y155f ff2 fs3 fc0 sc0 ls0 ws0\">At<span class=\"_ _1\"></span>tending pref<span class=\"_ _1\"></span>erence</div><div class=\"t m0 xbb hb y1560 ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc hc y1561 ff4 fs3 fc0 sc0 ls0 ws0\">Call x37709 (RT ba<span class=\"_ _0\"></span>t phone for charge R<span class=\"_ _0\"></span>T)<span class=\"ff2\">. The<span class=\"_ _a\"></span>y will ask the following:</span></div><div class=\"t m0 xbd h4 y1562 ffa fs8 fc1 sc0 ls0 ws0\"><span class=\"_ _87\"></span><span class=\"_ _88\"> </span><span class=\"ff2 fs3 fc0\">P<span class=\"_ _0\"></span>atient name, location</span></div><div class=\"t m0 xbd h4 y1563 ffa fs8 fc1 sc0 ls0 ws0\"><span class=\"_ _87\"></span><span class=\"_ _88\"> </span><span class=\"ff2 fs3 fc0\">At<span class=\"_ _1\"></span>tending provider</span></div><div class=\"t m0 xbd h4 y1564 ffa fs8 fc1 sc0 ls0 ws0\"><span class=\"_ _87\"></span><span class=\"_ _88\"> </span><span class=\"ff2 fs3 fc0\">Indication</span></div><div class=\"t m0 xbd h4 y1565 ffa fs8 fc1 sc0 ls0 ws0\"><span class=\"_ _87\"></span><span class=\"_ _88\"> </span><span class=\"ff2 fs3 fc0\">Scope requir<span class=\"_ _0\"></span>ed (ambuscope vs bronchoscope)</span></div><div class=\"t m0 xbf h8 y1566 ff7 fs6 fc1 sc0 ls0 ws0\">Aer the br<span class=\"_ _0\"></span>onchoscopy:</div><div class=\"t m0 xbb hb y1567 ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h6 y1568 ff3 fs3 fc0 sc0 ls0 ws0\"><span class=\"_ _0\"></span><span class=\"_ _0\"></span><span class=\"_ _0\"></span></div><div class=\"t m0 xbb hb y1569 ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 y156a ff2 fs3 fc0 sc0 ls0 ws0\">Fill out the order requisition:</div><div class=\"t m0 xbd h4 y156b ffa fs8 fc1 sc0 ls0 ws0\"><span class=\"_ _87\"></span><span class=\"_ _88\"> </span><span class=\"ff2 fs3 fc0\">Pneumonia diagnosis code: 498</span></div><div class=\"t m0 xbd h4 y156c ffa fs8 fc1 sc0 ls0 ws0\"><span class=\"_ _87\"></span><span class=\"_ _88\"> </span><span class=\"ff2 fs3 fc0\">Gram s<span class=\"_ _0\"></span>tain and culture for BAL </span></div><div class=\"t m0 xbd h6 y156d ffa fs8 fc1 sc0 ls0 ws0\"><span class=\"_ _87\"></span><span class=\"_ _88\"> </span><span class=\"ff3 fs3 fc0\"><span class=\"_ _0\"></span><span class=\"_ _0\"></span></span></div><div class=\"t m0 xbb hb y156e ff9 fs7 fc1 sc0 ls0 ws0\"> <span class=\"_ _7e\"></span><span class=\"ffa\"></span></div><div class=\"t m0 xbc h4 y156f ff2 fs3 fc0 sc0 ls0 ws0\">Order post<span class=\"_ _0\"></span>-bronchoscopy CXR </div>'}/>
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
