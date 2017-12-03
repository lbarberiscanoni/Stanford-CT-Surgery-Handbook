import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableHighlight} from 'react-native';
import * as firebase from "firebase";
import * as t from "tcomb-form-native";

let Form = t.form.Form;

// here we are: define your domain model
let Person = t.struct({
    name: t.String,       
    email: t.String,
    password: t.String
});

export default class Auth extends React.Component { 

    constructor() {
        super();
        this.state = {
            mail: "Enter your Email",
            password: "Enter your Password"
        }
    }

    newUser() {
        let value = this.refs.form.getValue();
        if (value) {
            console.log(value);
        }
        
        let email = value["email"];
        let password = value["password"];
        
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
            let errorCode = error.code;
            console.log(errorCode);
            let errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    recurrentUser() { 
        let value = this.refs.form.getValue();
        if (value) {
            console.log(value);
        }
        
        let email = value["email"];
        let password = value["password"];
        
        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            let errorCode = error.code;
            console.log(errorCode);
            let errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    render() {
        
        return(
            <View style={styles.container}>
                <Text>Login Form</Text>
                <Form ref="form" type={ Person } />
                <TouchableHighlight onPress={ () => { this.recurrentUser() }} style={ styles.button } underlayColor='#99d9f4'>
                    <Text style={ styles.buttonText }> Save </Text>
                </TouchableHighlight>      
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },

    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});
