import React, { useState, useEffect } from "react";
import calvinmap from "../assets/calvin-map-01.jpg";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import { Icon } from "react-native-elements";
import ImageZoom from "react-native-image-pan-zoom";
import Fuse from "fuse.js";
import { DonutLarge } from "@material-ui/icons";

const imageWidth = 4285;
const imageHeight = 3001;

export default function mapScreen({ navigation }) {
  // FYI, I had to wrap the ImageZoom in an ImageBackground to be able to
  // render things on top of it. The ScrollView is so the input/search box doesn't hike up the map
  const [pos, setPos] = useState({});
  const [posAvailable, setPosAvailable] = useState(false);
  // User posiiton
  const [pointX, setPointX] = useState(-100);
  const [pointY, setPointY] = useState(-100);
  // Searched waypoint marker
  const [waypointX, setWaypointX] = useState(-100);
  const [waypointY, setWaypointY] = useState(-100);

  const [isLoading, setLoading] = useState(false);
  const [heading, setHeading] = useState(0);
  const [searchText, setSearchText] = useState("");
  const debug = false;

  // Database integration
  const [roomData, setRoomData] = useState({
    floornumber: -1,
    interiorcoordinatesx: -100,
    interiorcoordinatesy: -100,
    lat: 0,
    lon: 0,
  });

  let building;
  let room;

  // Top left corner coordinates
  const absLat = 42.937977;
  const absLon = -85.593391;
  // Bottom right corner coordinates
  const maxLat = 42.926229;
  const maxLon = -85.570385;

  const buildings = [
    {
      name: "Science Building",
      code: "SB",
    },
    {
      name: "North Hall",
      code: "NH",
    },
    // TODO: Continue this
  ];
  const [counter, setCounter] = useState(0);
  // Fuzzy search parse function
  async function parse(input) {
    console.log("------ New Fetch ---------", counter);
    setCounter(counter + 1);

    const options = {
      includeScore: true,
      keys: ["name", "code"],
      threshold: 0.8,
    };

    const fuse = new Fuse(buildings, options);
    let result = fuse.search(input);

    // console.log(result);
    // console.log(result[0].item.code);
    building = result[0].item.code;

    let regex = /\d+/;
    if (input.match(regex)) {
      room = input.match(regex)[0];
    }

    let endURL;
    if (room === undefined) {
      endURL = "building/" + building;
    } else {
      endURL = "room/" + building + "+" + room;
    }
    debug && console.log(endURL);

    await fetch("https://wayfinder-service.herokuapp.com/" + endURL)
      // await fetch(
      //   'https://wayfinder-de-sb-coordin-ndr6ow.herokuapp.com/' + endURL
      // )
      .then((response) => response.json())
      .then((json) => {
        console.log("JSON Data", json);
        setRoomData(json);
      })
      .then(console.log("Room Data", roomData))
      .then(console.log(coordToPixel(roomData.lat, roomData.lon)))
      .then(() => {
        let coords = coordToPixel(roomData.lat, roomData.lon);
        setWaypointX(coords.x);
        setWaypointY(coords.y);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    Keyboard.dismiss();
  }

  // Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPos(position);
        setPosAvailable(true);
        debug && console.log(pos);
      },
      (error) => console.log(error.code, error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        showLocationDialog: true,
      }
    );

    if (posAvailable) {
      // let lat = 0.006500;
      // let long = 0.006000;

      const lat = Math.abs(pos.coords.latitude - absLat);
      const long = pos.coords.longitude - absLon;

      if (
        lat >= 0 &&
        lat <= Math.abs(absLat - maxLat) &&
        long >= 0 &&
        long <= Math.abs(absLon - maxLon)
      ) {
        setPointX((long * imageWidth) / Math.abs(absLon - maxLon));
        setPointY((lat * imageHeight) / Math.abs(absLat - maxLat));
        setLoading(false);
        setHeading(pos.coords.heading);
        debug && console.log(pointX);
        debug && console.log(pointY);
      } else {
        setLoading(false);
        Alert.alert("Out of bounds.");
      }
    }
  }, [pos]);

  function coordToPixel(latPos, longPos) {
    const relLat = Math.abs(latPos - absLat);
    const relLong = longPos - absLon;
    return {
      y: (relLat * imageHeight) / Math.abs(absLat - maxLat),
      x: (relLong * imageWidth) / Math.abs(absLon - maxLon),
    };
  }

  return (
    <View style={styles.main}>
      {/* eslint-disable-next-line multiline-ternary */}
      {isLoading ? (
        <View>
          <ActivityIndicator animating={true} />
        </View>
      ) : (
        <View>
          {/* Footer for search bar and buttons */}
          <View style={styles.footer}>
            {/* Search Bar */}
            <TextInput
              style={styles.searchBar}
              placeholder="Enter a classroom..."
              placeholderTextColor="#C4C4C4"
              // eslint-disable-next-line no-return-assign
              onChangeText={(text) => setSearchText(text)}
            ></TextInput>

            {/* Search Button */}
            <TouchableOpacity
              placeholder="Search"
              style={styles.searchButton}
              onPress={() =>
                searchText === ""
                  ? Alert.alert("Please enter search text!")
                  : parse(searchText)
              }
            >
              <Icon name="send" />
            </TouchableOpacity>
          </View>

          {/* ImageZoom for the map background */}
          <ImageZoom
            cropWidth={Dimensions.get("window").width}
            cropHeight={Dimensions.get("window").height}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            panToMove={true}
            pinchToZoom={true}
            enableCenterFocus={false}
            minScale={0.15}
          >
            {/* Main map */}
            <Image style={styles.map} source={calvinmap} />

            {/* Waypoint for Searched Waypoint */}
            <Pressable
              style={[
                styles.waypoint,
                { marginTop: waypointY - 64, marginLeft: waypointX - 32 }, // Waypoint locations offset by icon size
              ]}
              onPress={() => navigation.navigate("Interior", "SB")}
            >
              <Icon name="location-on" size={64} color="#F0CB02"></Icon>
            </Pressable>

            {/* User position (and heading) dot */}
            <View
              style={[
                styles.dot,
                {
                  marginTop: pointY - 10, // pointY offest by image size
                  marginLeft: pointX - 10, // pointX offest by image size
                  transform: [{ rotateZ: String(heading) + "deg" }],
                },
              ]}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/wayfinder-logo-yellow.png")}
              />
            </View>
          </ImageZoom>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-around",
    backgroundColor: "#FFFFFF",
  },
  imageViewWrapper: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  map: {
    width: imageWidth * 1,
    height: imageHeight * 1,
    zIndex: 0,
  },
  waypoint: {
    position: "absolute",
    // fontSize: 20,
  },
  sb: {
    width: 220 * 1.02,
    height: 170 * 1.02,
    opacity: 0.5,
  },
  dot: {
    width: 20,
    height: 20,
    position: "absolute",
  },
  footer: {
    backgroundColor: "#2D2D2D",
    color: "#2D2D2D",
    // marginTop: Dimensions.get("window").height * -0.06,
    // marginLeft: Dimensions.get("window").width * 2,
    bottom: 0,
    zIndex: 5,
    position: "absolute",
    maxWidth: "100%",
    minWidth: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  searchBar: {
    borderRadius: 35,
    borderColor: "#C4C4C4",
    backgroundColor: "#2D2D2D",
    borderWidth: 1,
    paddingHorizontal: 30,
    maxWidth: 220,
    minWidth: 220,
    minHeight: 40,
    maxHeight: 40,
    fontSize: 16,
    // eslint-disable-next-line no-dupe-keys
    backgroundColor: "#2D2D2D",
    marginTop: 25,
    marginBottom: 25,
    marginHorizontal: 10,
    // paddingTop: 5,
    // paddingBottom: 5,
    color: "#C4C4C4",
  },
  searchButton: {
    backgroundColor: "#f0cb02",
    borderWidth: 1,
    borderRadius: 35,
    borderColor: "#f0cb02",
    maxWidth: 100,
    minWidth: 100,
    marginTop: 25,
    marginBottom: 25,
    paddingTop: 7,
    marginHorizontal: 10,
    // paddingBottom: 15,
    // paddingStart: 116,
  },
  waypointMarker: {
    color: "#F0CB02",
  },
});
