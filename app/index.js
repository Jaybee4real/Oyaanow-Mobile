import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
} from "react-native";

import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import {
  Image,
  Svg,
  Circle,
  ClipPath,
  TouchableOpacity,
} from "react-native-svg";
import signUp from "./signUp";
const { width, height } = Dimensions.get("window");
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

//////////////////Run Timing Method From Expo Docs///////
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug("stop clock", stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

////////////////////////Run  Timing Method End/////////////////////////////
class Index extends Component {
  constructor() {
    super();

    this.buttonOpacity = new Value(1);
    this.buttonOpacity2 = new Value(1);

    this.onStateChangeSignIn = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rorateX = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          ...StyleSheet.absoluteFill
        }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }],
          }}
        >
          <Svg style={{ height: height + 50, width: width }}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={require("../assets/img/Hiace.jpg")}
              height={height + 50}
              width={width}
              preserveAspectRatio="xMidYmid slice"
              clipPath="#clip"
            />
          </Svg>
        </Animated.View>
        <Svg
          style={{
            height: 200,
            marginBottom: 160,
            justifyContent: "center",
            marginLeft: 60,
          }}
        >
          <Image
            href={require("../assets/img/logo-1.png")}
            height={200}
            width={width - 120}
          />
        </Svg>
        <View style={{ height: height / 3 }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChangeSignIn}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>

          <TapGestureHandler
            onHandlerStateChange={() => this.props.history.push("/signUp")}
          >
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
                marginTop: 10,
                backgroundColor: "#e67817",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>SIGN UP</Text>
            </Animated.View>
          </TapGestureHandler>

          <Animated.View
            style={{
              height: height / 3,
              zIndex: this.textInputZindex,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: "center",
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }],
            }}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeBtn}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    transform: [{ rotate: concat(this.rorateX, "deg") }],
                  }}
                >
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              placeholderTextColor="black"
            />

            <TextInput
              placeholder="Password"
              style={styles.textInput}
              placeholderTextColor="black"
            />

            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: "#e67817",
                marginTop: 10,
                marginHorizontal: 110,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>SIGN IN</Text>
            </Animated.View>


            <Animated.View style={{justifyContent: "center", alignItems: 'center', flexDirection: 'row-reverse', marginTop: 10}}>
              <Button title="SIGN UP" onPress={() => this.props.history.push("/signUp")} /><Text style={{marginRight: 10}}>Dont Have An Account?</Text> 
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  closeBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#e67817",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 1,
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

  textInput: {
    height: 50,
    borderRadius: 25,
    borderBottomWidth: 2,
    marginHorizontal: 10,
    borderBottomColor: "#e67817",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 60,
    color: "white",
  },
});
