import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import logo from './assets/img/bg.jpg'
import { Asset } from 'expo-asset'
import { AppLoading } from 'expo';
import Index from './app/index'



function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      isReady: false
    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/img/bg.jpg'),
    ]);


    await Promise.all([...imageAssets]);
  }

  render(){
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
      <View style={{...StyleSheet.absoluteFill}}>
      <Index />
      </View>
    )
  }
}


