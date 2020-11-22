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
      <Stack.Screen
        name="Interior"
        component={InteriorScreen}
        options={{
          // TODO: Get title to update dynamically with whatever building is being displayed
          title: "Science Building",
          headerStyle: { backgroundColor: "#2D2D2D" },
          headerBackImage: () => (
            <Icon name="keyboard-arrow-left" size={30} color="#FFFFFF" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
