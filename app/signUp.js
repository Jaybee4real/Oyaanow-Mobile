import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
 
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { TapGestureHandler } from "react-native-gesture-handler";
import Stack from "react-router-native-stack";
import { NativeRouter, Switch, Route } from "react-router-native";


const { width, height } = Dimensions.get("window");

export class signUp extends Component {
  render() {
    return (
      <KeyboardAwareScrollView style={{height: height}}>
        <TapGestureHandler
          onHandlerStateChange={() => this.props.history.push('/')}
        >
          <View
            style={{
              color: "#e67817",
              flexDirection: "row",
               width : width,
               marginTop: 25,
               marginBottom: 10,
               backgroundColor: "white",
               position: 'absolute'
            }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={22}
              style={{ color: "#e67817", marginTop: 7, marginLeft: 20 , marginRight: 5}}
            />
          </View>
        </TapGestureHandler>

        <View style={{marginTop: 35}}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              color: "#e67817",
              marginVertical: 15,
            }}
          >
            Sign Up
          </Text>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            placeholderTextColor="grey"
          />

          <TextInput
            placeholder="Username"
            style={styles.textInput}
            placeholderTextColor="grey"
          />

          <TextInput
            placeholder="Email Address"
            style={styles.textInput}
            placeholderTextColor="grey"
          />

          <TextInput
            placeholder="City(Not Required)"
            style={styles.textInput}
            placeholderTextColor="grey"
          />

          <TextInput
            placeholder="Phone Number"
            style={styles.textInput}
            placeholderTextColor="grey"
          />

          <TextInput
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor="grey"
          />

          <TextInput
            placeholder="Confirm Password"
            style={styles.textInput}
            placeholderTextColor="grey"
          />
          <TapGestureHandler
            onHandlerStateChange={() => this.props.history.push("/")}
          >
            <View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                marginTop: 10,
                backgroundColor: "#e67817",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>SIGN UP</Text>
            </View>
          </TapGestureHandler>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 25,
    borderBottomWidth: 1,
    marginVertical: 12,
    borderBottomColor: "#e67817",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 20,
    color: "black",
  },


  button: {
    backgroundColor: "white",
    height: 50,
    marginHorizontal: 60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 1,
  },

  container: {
    height: height - 23,
  },
});

export default signUp;
