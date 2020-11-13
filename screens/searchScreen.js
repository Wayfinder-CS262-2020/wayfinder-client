/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native'

// eslint-disable-next-line react/prop-types
export default function SearchScreen ({ route, navigation }) {
  // Database integration
  const [roomData, setRoomData] = useState([{ test: 'test' }])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    fetch('https://wayfinder-service.herokuapp.com/room/' + building + '+' + room)
      .then((response) => response.json())
      .then((json) => {
        const theArray = [json]
        setRoomData(theArray)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  // This should be changed as to allow queries without a space ("SB300 for example")
  const building = route.params.split(' ')[0]
  const room = route.params.split(' ')[1]

  // console.log(roomData)
  console.log(route.params)

  return (
    <View>
       {/* eslint-disable-next-line multiline-ternary */}
      {isLoading ? (
        <View>
          <ActivityIndicator animating={true} />
        </View>
      ) : (
        <FlatList
          data={roomData}
          // keyExtractor={(item) => item}
          renderItem={({ item }) => (
            // TODO: We should eventually make a custom component to display the rooms how we want them
            <View>
              <Text>{building} {room}</Text>
              <Text>Floor: {item.floornumber}</Text>
              <Text>(Debug) Xcoord: {item.interiorcoordinatesx}</Text>
              <Text>(Debug) Ycoord: {item.interiorcoordinatesy}</Text>
            </View>
          )}
        />
      )}
    </View>
  )
}
