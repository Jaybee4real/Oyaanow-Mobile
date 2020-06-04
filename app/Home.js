import React, { Component } from 'react'
import { Text, View , StyleSheet, Button} from 'react-native'

export class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> This Is The Home Page </Text>
                <Button onPress={() => this.props.history.push("/")} title="Go Back"></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})
export default Home
