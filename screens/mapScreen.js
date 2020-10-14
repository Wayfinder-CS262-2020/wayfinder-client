import React, { useState, useEffect } from "react";
import calvinmap from "../assets/calvin-0-cropped.jpg";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import ImageZoom from "react-native-image-pan-zoom";
import MapView from "expo";
import { globalStyles } from "../styles/global";

export default function mapScreen({ navigation }) {
  // FYI, I had to wrap the ImageZoom in an ImageBackground to be able to
  // render things on top of it. The ScrollView is so the input/search box doesn't hike up the map
  const [pos, setPos] = useState({});
  const [posAvailable, setPosAvailable] = useState(false);
  const [pointX, setPointX] = useState(-100);
  const [pointY, setPointY] = useState(-100);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPos(position);
        setPosAvailable(true);
        console.log(pos);
      },
      (error) => console.log(error.code, error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, showLocationDialog: true }
    );

    if (posAvailable) {
      // let lat = 0.006500;
      // let long = 0.006000;
      let lat = Math.abs(pos.coords.latitude - 42.935352);
      let long = pos.coords.longitude + 85.590951;

      if (lat >= 0 && lat <= 0.006573 && long >= 0 && long <= 0.006075) {
        setPointX(long * 219686.6);
        setPointY(lat * 334702.571);
        setLoading(false);
        console.log(pointX);
        console.log(pointY);
      } else {
        setLoading(false);
        Alert.alert("Out of bounds.");
      }

    };
  }, [posAvailable]);

  return (
    <ScrollView style={styles.main}>
      {isLoading ? <ActivityIndicator/> : (
      <ImageBackground style={styles.imageViewWrapper}>
        {/* Footer for search bar and buttons */}
        <View style={styles.footer}>
          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Enter a classroom..."
            placeholderTextColor="#C4C4C4"
          ></TextInput>

          {/* Search Button */}
          <TouchableOpacity placeholder="Search" style={styles.searchButton}>
            <Icon name="send" />
          </TouchableOpacity>
        </View>

        {/* ImageZoom for the map background */}
        <ImageZoom
          cropWidth={Dimensions.get("window").width}
          cropHeight={Dimensions.get("window").height}
          imageWidth={1444}
          imageHeight={2200}
          panToMove={true}
          pinchToZoom={true}
          enableCenterFocus={false}
          minScale={0.25}
        >
          <Image style={styles.map} source={calvinmap} />
          <Pressable
            style={[
              styles.press,
              {
                transform: [{ rotateZ: "330deg" }],
              },
            ]}
            onPress={() => navigation.navigate("Interior", "SB")}
            hitSlop={0}
            pressRetentionOffset={0}
          >
            <Image style={styles.sb} source={require("../assets/SB-0.jpg")} />
          </Pressable>
          
          <View style={{
            marginTop: pointY,
            marginLeft: pointX,
            backgroundColor: '#ff0000',
            width: 20,
            height: 20,
            position: 'absolute',
          }}/>
        </ImageZoom>
      </ImageBackground>

      // {/* The_Dunco: Experimenting around with react-native-apps, it gets into some really wonky stuff.
      // Expo hides a lot of the files that you need to add your API key and stuff like that. */}
      // {/* <MapView
      //   style={{
      //     flex: 1,
      //     ...StyleSheet.absoluteFillObject,
      //     position: "absolute",
      //   }}
      //   region={{
      //     latitude: 42.882004,
      //     longitude: 74.582748,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   }}
      //   showsUserLocation={true}
      // /> */}
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-around",
  },
  imageViewWrapper: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  map: {
    width: 1444,
    height: 2200,
    zIndex: 0,
  },
  press: {
    width: 220 * 1.2,
    height: 170 * 1.2,
    marginLeft: 300,
    marginTop: 1325,
    position: "absolute",
  },
  sb: {
    width: 220 * 1.2,
    height: 170 * 1.2,
    opacity: 0.8,
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
});
