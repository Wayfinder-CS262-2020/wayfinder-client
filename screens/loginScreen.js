import { capitalize, Input } from "@material-ui/core";
import { Navigation } from "@material-ui/icons";
import React from "react";
import { globalStyles } from "../styles/global";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

<link rel="stylesheet" href="https://use.typekit.net/spw7ajb.css"></link>;

export default function LoginScreen({ navigation }) {

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  function onSignIn(googleUser) {
    // console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
            );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(result){
          console.log('user signed in ');
          
firebase
.database()
.ref('/user/'+ result.user.uid)
.set({
  gmail:result.user.email,
  profile_pictire: result.additionalUserInfo.profile.picture,
  locale: result.additionalUserInfo.profile.locale,
  first_name: result.additionalUserInfo.given_name,
  last_name: result.additionalUserInfo.family_name,
})
.then(function(snapshot) {}); 
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        
        androidClientId: '1040139891690-s9h2f92idl8bdje4g37k1aoe1f9hfd7e.apps.googleusercontent.com',
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }


  return (
    /* Background */
    <ScrollView style={styles.container}>
      <View style={styles.centereverything}>
        <Image
          source={require("../assets/wayfinder-logo.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Wayfinder</Text>

        {/* Username input */}
        <View style={styles.uname}>
          <TextInput
            style={globalStyles.input}
            placeholder="Username or u@Calvin"
            placeholderTextColor="#C4C4C4"
          ></TextInput>
        </View>

        {/* Password input*/}
        <View style={styles.pswd}>
          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            placeholderTextColor="#C4C4C4"
          ></TextInput>
        </View>

        {/* Login Button */}
        <View styles={styles.loginview}>
          <TouchableOpacity
            style={styles.loginbutton}
            onPress={() => navigation.navigate("Loading")}
          >
            <Text styles={styles.logintext}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View styles={styles.loginview}>
          <TouchableOpacity 
            style={styles.loginbutton}
            onPress={() => {
              signInWithGoogleAsync();
              navigation.navigate("Loading");
            }}>
              <Text styles={styles.logintext}>Google singin</Text>
          </TouchableOpacity>
        </View>

        {/* guest login */}
        <View style={styles.guest}>
          <TouchableOpacity style={styles.guestbutton}>
            <Text style={styles.guesttext}>Continue as guest</Text>
          </TouchableOpacity>
        </View>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2D2D2D",
    // position: "absolute",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  centereverything: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 4156 * 0.03,
    height: 4156 * 0.03,
    paddingVertical: 20,
    marginTop: 80,
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
