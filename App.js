import React from 'react';
import { StyleSheet, View, ScrollView, WebView, Button, Image, Text} from 'react-native';
import * as firebase from "firebase";
import HtmlParser from 'react-native-htmlparser';
import Section from "./Section";

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
        this.state = {
            location: "home",
            table_of_contents: {},
            link: ''
        };

        this.viewContent = this.viewContent.bind(this);
    }

    listenForItems(itemsRef) {
        itemsRef.once("value").then((snap) => {
            let navList = snap.val()[0]["Manual"]

            this.setState({
                "table_of_contents": navList
            });
        });
    }

    componentWillMount() {
        this.listenForItems(this.itemsRef);
    }

    viewContent(link){
      this.setState({location: 'content', link: link})
    }

    makeNav(ob, count, link) {
        let components = []
        Object.keys(ob).map((key) => {
            if (key != "content") {
                let component = <Section style = {{ marginBottom: 20 }} key={ key } name={ key }>{ this.makeNav(ob[key], count + 1, link + "/" + key) }</Section>
                components.push(component)
            }else{
              // Content
              components.push(<Button color = '#8c1515' onPress={() => this.viewContent(link)} key = { count } title = "View Content"/>)
            }
        })
        return(components)
    }

    render() {
        switch(this.state.location) {
    			case "home":
    				return(
    					<View contentContainerStyle={ styles.contentContainer }>
                <View style = { styles.imageHolder }>
                  <Image style = { styles.image } source={require('./stanford_medicine_logo.png')} />
                </View>
                <ScrollView>
                  { this.makeNav(this.state.table_of_contents, 0, '0/Manual/') }
                </ScrollView>
    					</View>
    				)
            break;
          case "content":
            console.log("http://d2vd81lu361af4.cloudfront.net/viewContent?" + this.state.link)
            return(
              <View style = { webViewStyles.container } >
                <View style = { styles.imageHolder }>
                  <Image style = { styles.image } source={require('./stanford_medicine_logo.png')} />
                </View>
                <Button color = '#8c1515' onPress = {() => this.setState({location: 'home'})} title = {"Back"}/>
                <WebView
                  style = {{
                    width: '100%',
                    flex: 1
                  }}
                  javaScriptEnabled
                  renderLoading={() => <ActivityIndicator size={'small'} />}
                  renderError={() => <Text> A Loading error has occured</Text>}
                  scrollEnabled
                  scalesPageToFit
                  source={{uri: "http://d2vd81lu361af4.cloudfront.net/viewContent?" + this.state.link}}
                />
              </View>
            )
    				break;
		    }
    }
}


const styles = StyleSheet.create({
  contentContainer: {
      position: 'absolute',
      backgroundColor: '#dad7cb',
      marginBottom: '10%',
      width: '100%',
      height: '100%',
    },
    imageHolder: {
      height: 100,
      padding: '10%',
      backgroundColor: "#4d4f53",
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '70%',
      height: 100,
      resizeMode: 'contain',
    }
  });

const webViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    justifyContent: 'space-between',
  }
});
