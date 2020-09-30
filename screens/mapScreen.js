import React from "react";
import calvinmap from "../assets/calvin-0.jpg";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

export default function mapScreen({ navigation }) {
  return (
    <View style={styles.main}>
      <ImageZoom
        cropWidth={Dimensions.get("window").width}
        cropHeight={Dimensions.get("window").height}
        imageWidth={1700}
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
      </ImageZoom>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    alignContent: "flex-start",
  },
  map: {
    width: 1700,
    height: 2200,
  },
  press: {
    width: 220 * 1.2,
    height: 170 * 1.2,
    marginLeft: 430,
    marginTop: 1325,
    position: "absolute",
  },
  sb: {
    width: 220 * 1.2,
    height: 170 * 1.2,
    opacity: 0.8,
  },
});
