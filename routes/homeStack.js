import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/loginScreen';
import MapScreen from '../screens/mapScreen';

const Stack = createStackNavigator();
export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'#ddd'}}}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: 'Login Screen'}}
            />
            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={{title: 'Map Screen'}}
            />
        </Stack.Navigator>
    );
};
