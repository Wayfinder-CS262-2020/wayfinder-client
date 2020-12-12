import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import Navigator from "./routes/homeStack";
import { AppLoading } from "expo";

// Load the fonts
const getFonts = () =>
  Font.loadAsync({
    "lusitana-bold": require("./assets/fonts/Lusitana/Lusitana-Bold.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      // Make it so you can close the keybaord by touching anywhere
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        {/* View for the background and open screens with navigator */}
        <View style={styles.container}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
