import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

<link rel="stylesheet" href="https://use.typekit.net/spw7ajb.css"></link>;

export default function InfoScreen({ navigation }) {
  return (
    /* Background */
    <ScrollView style={styles.container}>
      {/* Wayfinder Logo */}
      <View style={styles.centereverything}>
        <Image
          source={require("../assets/wayfinder-logo.png")}
          style={styles.image}
        />
        <View style={styles.textGroup}>
          <Text style={styles.text}>
            1. Sign up with your Calvin email to login.
          </Text>
          <Text style={styles.text}>
            2. Once logged in, the map will appear. Enter the building and
            classroom you're looking for into the search bar and press the
            search button.
          </Text>
          <Text style={styles.text}>
            3. You will see a waypoint for the building you're searching for and
            a marker for your current location. Use these to navigate to the
            building.
          </Text>
          <Text style={styles.text}>
            4. Once inside the building, click on the waypoint to see the
            interior layout.
          </Text>
          <Text style={styles.text}>
            5. You should see the ground floor layout, use the side arrow
            buttons to navigate between floors. If you provided a room number,
            the room you're looking for will be marked with a waypoint.
          </Text>
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
  },
  image: {
    width: 4156 * 0.03,
    height: 4156 * 0.03,
    paddingVertical: 20,
  },
  text: {
    color: "#CBCBCB",
    fontSize: 18,
    fontWeight: "400",
    paddingBottom: 20,
  },
  textGroup: {
    marginRight: 30,
    marginLeft: 30,
    textAlign: "center",
    paddingBottom: 10,
  },
});
