import React, { useState } from "react";
import { StyleSheet, View, Image, Dimensions, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageZoom from "react-native-image-pan-zoom";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";

const assets = require("../assets/assets.js");

export default function interiorScreen(navigation, route) {
  const [currentFloor, setCurrentFloor] = useState("SB0");

  // Route fix
  route = useRoute();
  const buildingCode = route.params.code;

  // Function to change map floor up
  const goUp = function () {
    const buildingCode = currentFloor.substring(0, 2);
    const floorStr = currentFloor.substring(2, 3);
    let floorInt = Number(floorStr);
    floorInt += 1;
    const newFloor = buildingCode + floorInt;
    if (newFloor in assets[buildingCode]) {
      setCurrentFloor(newFloor);
    }
  };

  // Function to change map floor down
  const goDown = function () {
    const buildingCode = currentFloor.substring(0, 2);
    const floorStr = currentFloor.substring(2, 3);
    let floorInt = Number(floorStr);
    floorInt -= 1;
    const newFloor = buildingCode + floorInt;
    if (newFloor in assets[buildingCode]) {
      setCurrentFloor(newFloor);
    }
  };
  return (
    // Main interior screen
    <View style={styles.main}>
      <ImageZoom
        cropWidth={Dimensions.get("window").width}
        cropHeight={Dimensions.get("window").height}
        imageWidth={4168}
        imageHeight={3334}
        panToMove={true}
        pinchToZoom={true}
        enableCenterFocus={false}
        minScale={0.15}
        centerOn={{ x: 0, y: 0, scale: 0.15, duration: 2 }}
      >
        <View style={styles.chipContainer}>
          <Text style={styles.chip}>CHIP!: {currentFloor[2]}</Text>
        </View>
        <Icon
          style={[
            styles.waypoint,
            {
              // marginTop: route.params.xCoord - 64,
              // marginLeft: route.params.yCoord - 32,
            }, // Waypoint locations offset by icon size
          ]}
          name="location-on"
          size={64}
          // color="#F0CB02"
          color="#fff"
        ></Icon>
        <Image source={assets[buildingCode][currentFloor]} />
      </ImageZoom>

      {/* Buttons for up/down floor */}
      <View style={styles.buttonContainer}>
        <View style={styles.chipContainer}>
          <Text style={styles.chip}>Floor: {currentFloor[2]}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => goUp()}>
            <Icon name="keyboard-arrow-up" />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => goDown()}>
            <Icon name="keyboard-arrow-down" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waypoint: {
    position: "absolute",
  },
  main: {
    bottom: 40,
    alignContent: "space-around",
    backgroundColor: "#121212",
  },
  buttonContainer: {
    marginLeft: Dimensions.get("window").width * 0.8,
    marginTop: Dimensions.get("window").height * 0.7,
    // flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
  },
  button: {
    backgroundColor: "#f0cb02",
    borderWidth: 0,
    borderRadius: 50,
    borderColor: "#f0cb02",
    maxWidth: 50,
    minWidth: 50,
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  chipContainer: {
    borderRadius: 30,
    width: 80,
    height: 32,
    backgroundColor: "#2D2D2D",
    top: 122,
    right: 100,
  },
  chip: {
    color: "white",
    padding: 5,
    paddingLeft: 15,
  },
});
