import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import firebase from 'firebase';
import { StylesProvider } from "@material-ui/core";


export default function LoadingScreen({ navigation }) {
    
    checkIfLoggedIn = () => {
        
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                navigation.navigate("Map")
            } else {
                navigation.navigate("Login")
            }
        })
    }

    
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <View>
                <TouchableOpacity
                    style={styles.loginbutton}
                    onPress={() => checkIfLoggedIn()}
                >
                    <Text styles={styles.logintext}>:)</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
      }
});