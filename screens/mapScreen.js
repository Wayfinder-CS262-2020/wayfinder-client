import React, { useState, useEffect } from 'react'
import calvinmap from '../assets/calvin-map-01.jpg'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native'
import { Icon } from 'react-native-elements'
import ImageZoom from 'react-native-image-pan-zoom'

const imageWidth = 4285
const imageHeight = 3001

export default function mapScreen ({ navigation }) {
  // FYI, I had to wrap the ImageZoom in an ImageBackground to be able to
  // render things on top of it. The ScrollView is so the input/search box doesn't hike up the map
  const [pos, setPos] = useState({})
  const [posAvailable, setPosAvailable] = useState(false)
  const [pointX, setPointX] = useState(-100)
  const [pointY, setPointY] = useState(-100)
  const [isLoading, setLoading] = useState(false)
  const [heading, setHeading] = useState(0)
  const [searchText, setSearchText] = useState('')
  const debug = false

  // Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPos(position)
        setPosAvailable(true)
        debug && console.log(pos)
      },
      (error) => console.log(error.code, error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        showLocationDialog: true
      }
    )

    if (posAvailable) {
      // let lat = 0.006500;
      // let long = 0.006000;

      // Top left corner coordinates
      const absLat = 42.937858
      const absLon = -85.593565
      // Bottom right corner coordinates
      const maxLat = 42.926166
      const maxLon = -85.570076

      const lat = Math.abs(pos.coords.latitude - absLat)
      const long = pos.coords.longitude - absLon

      if (
        lat >= 0 &&
        lat <= Math.abs(absLat - maxLat) &&
        long >= 0 &&
        long <= Math.abs(absLon - maxLon)
      ) {
        setPointX((long * imageWidth) / Math.abs(absLon - maxLon))
        setPointY((lat * imageHeight) / Math.abs(absLat - maxLat))
        setLoading(false)
        setHeading(pos.coords.heading)
        debug && console.log(pointX)
        debug && console.log(pointY)
      } else {
        setLoading(false)
        Alert.alert('Out of bounds.')
      }
    }
  }, [pos])

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
              onChangeText={ (text) => setSearchText(text)}
            ></TextInput>

            {/* Search Button */}
            <TouchableOpacity
              placeholder="Search"
              style={styles.searchButton}
              onPress={() => searchText === '' ? Alert.alert('Please enter search text!') : navigation.navigate('Search', searchText)} // TODO: Add ability to pass data to search screen
            >
              <Icon name="send" />
            </TouchableOpacity>
          </View>

          {/* ImageZoom for the map background */}
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            panToMove={true}
            pinchToZoom={true}
            enableCenterFocus={false}
            minScale={0.15}
          >
            {/* Main map */}
            <Image style={styles.map} source={calvinmap} />

            {/* Waypoint for Science Building */}
            <Pressable
              style={[styles.press]}
              onPress={() => navigation.navigate('Interior', 'SB')}
            >
              <Icon name="location-on" color="#F0CB02"></Icon>
            </Pressable>

            {/* User position (and heading) dot */}
            <View
              style={[
                styles.dot,
                {
                  marginTop: pointY,
                  marginLeft: pointX,
                  transform: [{ rotateZ: String(heading) + 'deg' }]
                }
              ]}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../assets/wayfinder-logo-yellow.png')}
              />
            </View>
          </ImageZoom>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-around',
    backgroundColor: '#FFFFFF'
  },
  imageViewWrapper: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  map: {
    width: imageWidth * 1,
    height: imageHeight * 1,
    zIndex: 0
  },
  press: {
    width: 220 * 1.2,
    height: 170 * 1.2,
    marginLeft: 700,
    marginTop: 1780,
    position: 'absolute'
  },
  sb: {
    width: 220 * 1.02,
    height: 170 * 1.02,
    opacity: 0.5
  },
  dot: {
    width: 20,
    height: 20,
    position: 'absolute'
  },
  footer: {
    backgroundColor: '#2D2D2D',
    color: '#2D2D2D',
    // marginTop: Dimensions.get("window").height * -0.06,
    // marginLeft: Dimensions.get("window").width * 2,
    bottom: 0,
    zIndex: 5,
    position: 'absolute',
    maxWidth: '100%',
    minWidth: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  searchBar: {
    borderRadius: 35,
    borderColor: '#C4C4C4',
    backgroundColor: '#2D2D2D',
    borderWidth: 1,
    paddingHorizontal: 30,
    maxWidth: 220,
    minWidth: 220,
    minHeight: 40,
    maxHeight: 40,
    fontSize: 16,
    // eslint-disable-next-line no-dupe-keys
    backgroundColor: '#2D2D2D',
    marginTop: 25,
    marginBottom: 25,
    marginHorizontal: 10,
    // paddingTop: 5,
    // paddingBottom: 5,
    color: '#C4C4C4'
  },
  searchButton: {
    backgroundColor: '#f0cb02',
    borderWidth: 1,
    borderRadius: 35,
    borderColor: '#f0cb02',
    maxWidth: 100,
    minWidth: 100,
    marginTop: 25,
    marginBottom: 25,
    paddingTop: 7,
    marginHorizontal: 10
    // paddingBottom: 15,
    // paddingStart: 116,
  },
  waypointMarker: {
    color: '#F0CB02'
  }
})
