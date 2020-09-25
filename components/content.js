import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { images } from '../styles/global';


export default function Content() {
    const [inputBuilding, setInputBuilding] = useState('');
    const [buildingName, setBuildingName] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [shownText, setText] = useState('');
    const [classNumber, setNumber] = useState('');
  
    
    
    const clickHandler = () =>{
        if(inputBuilding.length < 5){
            setText(inputBuilding.toUpperCase() + " " + inputNumber);
            setNumber(inputNumber);
            setBuildingName(inputBuilding);
        }else {
            Alert.alert('Woops!', 'Class not found.', [{text: 'Understood'}]); 
        }
      
    }
    return (
        <View  style={styles.content}>
            
            <View style={styles.subContent}>
                <MaterialIcons name='map' size={20} color='white'/>
                <Text style={styles.subTitle}>Ready to find your class?</Text>
            </View>
            
            <View style={styles.content}>
                <StatusBar style="auto" />
            
            
                <Text style={styles.whiteText}>Building: </Text>
                <TextInput style={styles.input}
                placeholder='e.g. Science Building/SB'
                onChangeText={(val) => setInputBuilding(val)}
                />
                
                
                <Text style={styles.whiteText}>Room Number:</Text>
                <TextInput style={styles.input}
                keyboardType='numeric'
                maxLength={3}
                placeholder='e.g. 101'
                onChangeText={(val) => setInputNumber(val)}
                />
                <View style={styles.button}>
                    <Button title='search' onPress={clickHandler} />
                    <View>
                        <Text style={styles.whiteText}>{shownText}</Text>
                        <Image 
                        resizeMode='center'
                        source={images.classroooms[buildingName.toUpperCase() + "-" + classNumber[0]]}
                        style={styles.image}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    content: {  
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: 'darkgrey',
        padding: 5,
        margin: 5,
        width: 200,
        color: 'white'
        },
    image: {
        width: 250,
        height: 250,
    },
    whiteText: {
        color: 'white'
    },
    subContent:{
        flexDirection: 'row'
    },
    subTitle: {
        marginLeft: 10,
        color: 'white'
    }
});