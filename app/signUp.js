import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import {Index } from './index'

export class signUp extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button style={{backgroundColor: 'white',}} title="SignIn" 
          onPress={() => this.props.history.push('/')}/>
      </View>
    )
  }
}

export default signUp
