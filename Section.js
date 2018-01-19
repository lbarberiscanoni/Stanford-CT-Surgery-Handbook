import React from 'react';
import { Button, StyleSheet, Text, View} from 'react-native';

export default class Section extends React.Component {

    constructor() {
        super();
    }

    render() {
		let components = []
		this.props.sections.map((section) => {
			components.push(<Button title={ section } />)
		})

		return(
			<View>
				<Text> { this.props.area } </Text>
				{ components }
			</View>
		)
    }
}
