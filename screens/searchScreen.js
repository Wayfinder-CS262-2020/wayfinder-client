import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
    ActivityIndicator,
    FlatList,
  TouchableOpacity
} from "react-native";

export default function SearchScreen({ navigation }) {
    
// Database integration
    const [roomData, setRoomData] = useState([{ "test": "test" }]);
    const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    fetch("https://wayfinder-service.herokuapp.com/room/SB+300")
        .then((response) => response.json())
        .then((json) => setRoomData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, []);
    
    console.log(roomData)
    return (
    <View>
      {isLoading ? (
      <View>
        <ActivityIndicator animating={true} />
      </View>
      ) : (
        <FlatList
          data={roomData}
          renderItem={({ item }) => (
            <TouchableOpacity
            >
                <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
    )
}