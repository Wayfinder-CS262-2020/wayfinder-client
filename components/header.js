import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';


export default function Header() {
    return (
        <View  style={styles.header}>
            <Image source={require('../assets/calvin-uni-logo.jpg')}
            style={styles.image}
            />
            <Text style={styles.headerText}>WayFinder </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        padding: 1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    image: {
        height: '100%',
        width: '50%',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1

    }
})