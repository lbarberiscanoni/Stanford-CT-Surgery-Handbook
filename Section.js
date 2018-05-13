import React from 'react';
import { Button, StyleSheet, Text, View} from 'react-native';

export default class Section extends React.Component {

    constructor() {
        super();
        this.state = {
            "clickStatus": "false"
        }
    }

    render() {
        if (this.state.clickStatus == "false") {
            return(
                <View>
                    <Button title={ this.props.name } onPress={ () => this.setState({"clickStatus": "true" }) } >
                    </Button>
                </View>
            )
        } else {
            return(
                <View>
                    <Button title={ this.props.name } onPress={ () => this.setState({"clickStatus": "false" }) } >
                    </Button>
                    { this.props.children }
                </View>
            )
        }
    }
}
