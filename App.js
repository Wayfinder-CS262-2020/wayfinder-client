import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./components/header";
import Content from "./components/content";

import Navigator from "./routes/homeStack";

export default function App() {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </View>

      {/*
    
      Home
      <View style={styles.content}>
        Content
        <LoginScreen />
      </View>
    </View>
    */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "yellow", //"#2D2D2D",
  },
});
