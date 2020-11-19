import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/loginScreen";
import MapScreen from "../screens/mapScreen";
import InteriorScreen from "../screens/interiorScreen";

import { Button } from "react-native";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login Screen",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
