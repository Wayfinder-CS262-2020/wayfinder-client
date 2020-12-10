import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageZoom from "react-native-image-pan-zoom";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";

const assets = require("../assets/assets.js");

export default function interiorScreen(navigation, route) {
  // Route fix
  route = useRoute();
  const buildingCode = route.params.code;
  const [currentFloor, setCurrentFloor] = useState(
    String(buildingCode) +
      (route.params.floor !== undefined ? String(route.params.floor) : "1")
  );

  // Function to change map floor up
  const goUp = function () {
    const buildingCode = currentFloor.substring(0, 2);
    const floorStr = currentFloor.substring(2, 3);
    let floorInt = Number(floorStr);
    floorInt += 1;
    const newFloor = buildingCode + floorInt;
    if (newFloor in assets[buildingCode]) {
      setCurrentFloor(newFloor);
    } else {
      console.log("asset not found");
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
  useEffect(() => {
    console.log(currentFloor.substring(2, 3));
    console.log(route.params.floor);
    console.log(route.params.floor <= parseInt(currentFloor.substring(2, 3)));
  });
  console.log(route.params.xCoord - 64, route.params.yCoord - 32);
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
        <Image source={assets[buildingCode][currentFloor]} />

        {/* Waypoint Marker*/}
        {route.params.floor == currentFloor.substring(2, 3) && (
          <Pressable
            style={[
              styles.waypoint,
              {
                top: route.params.yCoord - 256,
                left: route.params.xCoord - 256 / 2,
              }, // Waypoint locations offset by icon size
            ]}
          >
            <Icon name="location-on" size={256} color="#F0CB02"></Icon>
          </Pressable>
        )}
      </ImageZoom>

      {/* Buttons for up/down floor */}
      <View style={styles.buttonContainer}>
        <View style={styles.chipContainer}>
          <Text style={styles.chip}>Floor: {currentFloor[2]}</Text>
        </View>

        {/* Up button */}
        {/* <View style={styles.button, route.params.floor <= parseInt(currentFloor.substring(2, 3)) ? styles.dark : styles.light}> */}
        <View style={styles.button}>
          <TouchableOpacity onPress={() => goUp()}>
            <Icon
              size={32}
              color={
                route.params.floor <= parseInt(currentFloor.substring(2, 3))
                  ? "black"
                  : "red"
              }
              name="keyboard-arrow-up"
            />
          </TouchableOpacity>
        </View>

        {/* Down button */}
        {/* <View style={styles.button, currentFloor >= currentFloor.substring(2, 3) ? styles.dark : styles.light}> */}
        <View style={styles.button}>
          <TouchableOpacity onPress={() => goDown()}>
            <Icon
              size={32}
              color={
                route.params.floor >= parseInt(currentFloor.substring(2, 3))
                  ? "black"
                  : "red"
              }
              name="keyboard-arrow-down"
            />
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
    marginTop: Dimensions.get("window").height * 0.65,
    // justifyContent: "space-around",
    position: "absolute",
  },
  button: {
    backgroundColor: "#f0cb02",
    borderWidth: 0,
    borderRadius: 50,
    borderColor: "#f0cb02",
    height: 50,
    width: 50,
    marginTop: 15,
    paddingTop: 9,
    paddingBottom: 4,
  },
  chipContainer: {
    borderRadius: 50,
    width: 100,
    height: 50,
    backgroundColor: "#2D2D2D",
    top: 140,
    right: 120,
    marginBottom: 10,
  },
  chip: {
    // justify: "center",
    color: "white",
    padding: 14,
    paddingLeft: 20,
    fontSize: 17,
  },
  dark: {
    borderWidth: 0,
    borderRadius: 50,
    borderColor: "#f0cb02",
    maxWidth: 50,
    minWidth: 50,
    marginTop: 15,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#665600",
  },
  light: {
    borderWidth: 0,
    borderRadius: 50,
    borderColor: "#f0cb02",
    maxWidth: 50,
    minWidth: 50,
    marginTop: 15,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#f0cb02",
  },
});
