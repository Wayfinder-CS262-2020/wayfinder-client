import { capitalize, Input } from "@material-ui/core";
import { Navigation } from "@material-ui/icons";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

<link rel="stylesheet" href="https://use.typekit.net/spw7ajb.css"></link>;

export default function LoginScreen({ navigation }) {
  return (
    /* Background */
    <View style={styles.container}>
      <Image
        source={require("../assets/wayfinder-logo.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Wayfinder</Text>

      {/* Username input */}
      <View style={styles.uname}>
        <TextInput
          style={styles.input}
          placeholder="Username or u@Calvin"
          placeholderTextColor="#C4C4C4"
        ></TextInput>
      </View>

      {/* Password */}
      <View style={styles.pswd}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#C4C4C4"
        ></TextInput>
      </View>

      {/* Login Button */}
      <View styles={styles.loginview}>
        <TouchableOpacity style={styles.loginbutton} onPress={() => navigation.navigate('Map')}>
          <Text styles={styles.logintext}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      {/* guest login */}
      <View style={styles.guest}>
        <TouchableOpacity style={styles.guestbutton}>
          <Text style={styles.guesttext}>Continue as guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2D2D2D",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 75,
  },
  image: {
    width: "25%",
    height: "25%",
    paddingVertical: 20,
  },
  text: {
    color: "#CBCBCB",
    fontSize: 50,
    fontFamily: "acumin-pro,sans-serif",
    fontWeight: "400",
  },
  input: {
    borderRadius: 35,
    borderColor: "#C4C4C4",
    backgroundColor: "#2D2D2D",
    borderWidth: 1,
    paddingHorizontal: 30,
    marginTop: 20,
    maxWidth: 275,
    minWidth: 275,
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 15,
    color: "#C4C4C4",
  },
  uname: {
    backgroundColor: "#2D2D2D",
    alignItems: "center",
    color: "#C4C4C4",
    marginTop: 50,
  },
  pswd: {
    backgroundColor: "#2D2D2D",
    alignItems: "center",
  },
  loginbutton: {
    backgroundColor: "#f0cb02",
    borderWidth: 1,
    borderRadius: 35,
    borderColor: "#f0cb02",
    maxWidth: 275,
    minWidth: 275,
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    // paddingHorizontal: 110,
    paddingStart: 116,
  },
  logintext: {
    fontSize: 18,
    color: "#2D2D2D",
    width: "100%",
  },
  loginview: {
    backgroundColor: "#2D2D2D",
    alignItems: "center",
    justifyContent: "center",
  },
  guest: {
    marginTop: 10,
  },
  guestbutton: {
    backgroundColor: "#2D2D2D",
    paddingStart: 10,
  },
  guesttext: {
    color: "#CBCBCB",
  },
});
