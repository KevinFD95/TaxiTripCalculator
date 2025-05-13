import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Pressable, Animated } from "react-native";

import { ThemeContext } from "../context/ThemeContext.jsx";

export default function CustomSwitch({ value = false, onValueChange }) {
  const { theme } = useContext(ThemeContext);
  const [isOn, setIsOn] = useState(value);
  const animation = useState(new Animated.Value(value ? 1 : 0))[0];

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn, animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 30],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme["tab-navigator"], theme["selected-icons"]],
  });

  const thumbColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme["unselected-icons"], theme["tab-navigator"]],
  });

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
    if (onValueChange) {
      onValueChange(!isOn);
    }
  };

  return (
    <Pressable onPress={toggleSwitch} style={StyleSheet.switchContainer}>
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX }], backgroundColor: thumbColor },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: 60,
    height: 30,
    justifyContent: "center",
    padding: 2,
  },

  track: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    padding: 2,
  },

  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
});
