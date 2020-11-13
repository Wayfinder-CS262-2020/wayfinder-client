import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImageZoom from 'react-native-image-pan-zoom'
import { Icon } from 'react-native-elements'

const assets = require('../assets/assets.js')

export default function interiorScreen () {
  const [currentFloor, setCurrentFloor] = useState('SB0')

  // Function to change map floor up
  const goUp = function () {
    const buildingCode = currentFloor.substring(0, 2)
    const floorStr = currentFloor.substring(2, 3)
    let floorInt = Number(floorStr)
    floorInt += 1
    const newFloor = buildingCode + floorInt
    if (newFloor in assets) {
      setCurrentFloor(newFloor)
    }
  }

  // Function to change map floor down
  const goDown = function () {
    const buildingCode = currentFloor.substring(0, 2)
    const floorStr = currentFloor.substring(2, 3)
    let floorInt = Number(floorStr)
    floorInt -= 1
    const newFloor = buildingCode + floorInt
    if (newFloor in assets) {
      setCurrentFloor(newFloor)
    }
  }

  return (
    // Main interior screen
    <View style={{ alignContent: 'space-around' }}>
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
        <Image source={assets[currentFloor]} />
      </ImageZoom>
      {/* Buttons for up/down floor */}
      <View style={styles.buttonContainer}>
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
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: Dimensions.get('window').width * 0.75,
    marginTop: Dimensions.get('window').height * 0.7,
    // flexDirection: "row",
    justifyContent: 'space-around',
    position: 'absolute'
  },
  button: {
    backgroundColor: '#f0cb02',
    borderWidth: 1,
    borderRadius: 35,
    borderColor: '#f0cb02',
    maxWidth: 50,
    minWidth: 50,
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    padding: 10
  }
})
