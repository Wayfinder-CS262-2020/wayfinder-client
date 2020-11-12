import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

export default function SearchScreen({ navigation }) {
    
// Database integration
    const [roomData, setRoomData] = useState('');
    const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    fetch("https://wayfinder-service.herokuapp.com/")
        .then((response) => response.json())
        .then((json) => setRoomData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, []);
    return (
    <View>
      {isLoading ? (
      <View>
        <ActivityIndicator animating={true} />
      </View>
      ) : (
        <Text>{ roomData }</Text>
      )}
    </View>
    )
}