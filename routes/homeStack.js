import React from "react";
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";

import LoginScreen from "../screens/loginScreen";
import MapScreen from "../screens/mapScreen";
import InteriorScreen from "../screens/interiorScreen";

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
          title: "Map Screen",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Interior"
        component={InteriorScreen}
        options={{ title: "Interior Screen", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
