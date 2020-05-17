import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { TapGestureHandler } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export class signUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TapGestureHandler
          onHandlerStateChange={() => this.props.history.push("/")}
        >
          <View
            style={{
              color: "#e67817",
              paddingTop: 5,
              fontSize: 15,
              flexDirection: "row",
            }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ color: "#e67817", marginTop: 4, marginLeft: 2 }}
            />
            <Text style={{ color: "#e67817", fontSize: 17 }}>Back (Sign In)</Text>
          </View>
        </TapGestureHandler>

        <View style={{}}>
          <Text style={{textAlign: "center", fontSize: 25, color: '#e67817', marginBottom: 15}}>Sign Up</Text>
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
        </View>
      </View>
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
    color: "white",
  },

  container: {
    height: height - 23,
  },
});

export default signUp;
