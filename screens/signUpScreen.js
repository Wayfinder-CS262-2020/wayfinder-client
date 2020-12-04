import React from "react";
import { globalStyles } from "../styles/global";
import { capitalize, Input } from "@material-ui/core";
import { Navigation } from "@material-ui/icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

//eslint ignore
<link rel="stylesheet" href="https://use.typekit.net/spw7ajb.css"></link>;

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const checkCredentials = async () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|([a-z]+[0-9]+)@calvin.edu)$/;
    // .endsWith makes sure it's a calivn email
    setUsername(username.toLowerCase());
    if (
      (re.test(username) &&
        password != "" &&
        username.endsWith("@calvin.edu")) ||
      username.endsWith("@students.calvin.edu")
    ) {
      if (password === confPassword) {
        // Credentials Ok

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: username.toLowerCase(),
            password: password,
          }),
        };
        await fetch(
          "https://wayfinder-service.herokuapp.com/auth/create/",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => this.setState({ postId: data.id }))
          .then(navigation.navigate("Login"));
      } else {
        Alert.alert("Error", "Passwords Don't Match", [
          { text: "Okay", onPress: () => {} },
        ]);
      }
    } else {
      Alert.alert(
        "Error",
        "Invalid credentials: Make sure username is lowercase and of the format\nu##@calvin.edu or u##@students.calvin.edu",
        [{ text: "Okay", onPress: () => {} }]
      );
    }
  };

  return (
    /* Background */
    <ScrollView style={styles.container}>
      <View style={styles.centereverything}>
        {/* Wayfinder Logo */}
        <Image
          source={require("../assets/wayfinder-logo.png")}
          style={styles.image}
        />
        {/* Username input */}
        <View style={styles.uname}>
          <TextInput
            style={globalStyles.input}
            placeholder="Username or u@Calvin"
            placeholderTextColor="#C4C4C4"
            onChangeText={(text) => setUsername(text)}
            value={username}
          ></TextInput>
        </View>

        {/* Password input*/}
        <View style={styles.pswd}>
          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            placeholderTextColor="#C4C4C4"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          ></TextInput>
        </View>

        {/* Password Confirmation*/}
        <View style={styles.pswd}>
          <TextInput
            style={globalStyles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#C4C4C4"
            onChangeText={(text) => setConfPassword(text)}
            value={confPassword}
            secureTextEntry={true}
          ></TextInput>
        </View>

        {/* Login Button */}
        <View styles={styles.loginview}>
          <TouchableOpacity
            style={styles.loginbutton}
            onPress={() => checkCredentials()}
          >
            <Text styles={styles.logintext}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2D2D2D",
    flex: 1,
  },
  centereverything: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 29,
  },
  image: {
    width: 4156 * 0.03,
    height: 4156 * 0.03,
  },
  text: {
    color: "#CBCBCB",
    fontSize: 50,
    fontFamily: "lusitana-bold",
    fontWeight: "400",
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
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  guestbutton: {
    backgroundColor: "#2D2D2D",
  },
  guesttext: {
    color: "#f0cb02",
  },
  signUpButton: {
    paddingLeft: 85,
  },
});
