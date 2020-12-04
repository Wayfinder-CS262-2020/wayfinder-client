import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/loginScreen";
import InteriorScreen from "../screens/interiorScreen";
import SignUpScreen from "../screens/signUpScreen";
import MapScreen from "../screens/mapScreen";
import InfoScreen from "../screens/infoScreen";

import { Text } from "react-native";
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
        options={({ route }) => ({
          headerStyle: { backgroundColor: "#2D2D2D" },
          headerBackImage: () => (
            <Icon name="keyboard-arrow-left" size={32} color="white" />
          ),
          headerTitle: (props) => (
            <Text
              {...props}
              style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            >
              {route.params.name}{" "}
              {route.params.room === undefined
                ? ""
                : "Room " + route.params.room}
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={() => ({
          headerStyle: { backgroundColor: "#2D2D2D" },
          headerBackImage: () => (
            <Icon name="keyboard-arrow-left" size={32} color="white" />
          ),
          headerTitle: (props) => (
            <Text
              {...props}
              style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            >
              Sign Up
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={() => ({
          headerStyle: { backgroundColor: "#2D2D2D" },
          headerBackImage: () => (
            <Icon name="keyboard-arrow-left" size={32} color="white" />
          ),
          headerTitle: (props) => (
            <Text
              {...props}
              style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            >
              Info
            </Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
