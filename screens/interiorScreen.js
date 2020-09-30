import { Style } from "@material-ui/icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  Button,
} from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';

const assets = require('../assets/assets.js')


export default function interiorScreen({ navigation }) {
  const [currentFloor, setCurrentFloor] = useState('SB0');

  const goUp = function () {
    var buildingCode = currentFloor.substring(0, 2);
    var floorStr = currentFloor.substring(2, 3);
    var floorInt = Number(floorStr);
    floorInt += 1;
    var newFloor = buildingCode + floorInt;
    if (newFloor in assets) {
        setCurrentFloor(newFloor);
    };
  }

  const goDown = function () {
    var buildingCode = currentFloor.substring(0, 2);
    var floorStr = currentFloor.substring(2, 3);
    var floorInt = Number(floorStr);
    floorInt -= 1;
    var newFloor = buildingCode + floorInt;
    if (newFloor in assets) {
        setCurrentFloor(newFloor);
    };
  }

  return (
    <View style={{alignContent: 'space-around'}}>
        <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={2200}
            imageHeight={1700}
            panToMove={true}
            pinchToZoom={true}
            enableCenterFocus={false}
            minScale={0.25}
        >
            <Image
                source={assets[currentFloor]}
            />
        </ImageZoom>
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <Button title='up' onPress={() => goUp()}/>
            </View>
            <View style={styles.button}>
                <Button title='down' onPress={() => goDown()}/>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginLeft: Dimensions.get('window').width * 0.75,
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
    },
    button: {
        padding: 10,
    }
})