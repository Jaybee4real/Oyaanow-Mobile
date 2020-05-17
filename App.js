import React  from "react";
import { StyleSheet, Text, View, Image, BackHandler, ToastAndroid } from "react-native";
import logo from "./assets/img/bg.jpg";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import Index from "./app/index";
import signUp from "./app/signUp";
import { NativeRouter, Switch, Route } from "react-router-native";
import Stack from "react-router-native-stack";


function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}



var backButtonPressedOnceToExit = false;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }



componentWillMount(){
  BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
}

componentWillUnmount(){
  BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

onBackPress() {
      if (backButtonPressedOnceToExit) {
          BackAndroid.exitApp();
      } else {
          if (Actions.currentScene !== 'Home') {
              Actions.pop();
              return true;
          } else {
              backButtonPressedOnceToExit = true;
              ToastAndroid.show("Press Back Button again to exit",ToastAndroid.SHORT);
              //setting timeout is optional
              setTimeout( () => { backButtonPressedOnceToExit = false }, 2000);
              return true;
          }
      }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require("./assets/img/bg.jpg")]);

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (

      <NativeRouter>
        <Stack animationType="slide-horizontal">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/signUp" component={signUp} />
            </Switch>
        </Stack>
      </NativeRouter>

    );
  }
}
