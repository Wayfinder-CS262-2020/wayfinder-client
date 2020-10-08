import React, { useState } from "react";
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const getPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Map Permission",
            message:
              "Map plz",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission granted");
        //   Geolocation.getCurrentPosition(
        //     (position) => {
        //         console.log(position);
        //     },
        //     (error) => {
        //     // See error code charts below.
        //         console.log(error.code, error.message);
        //     },
        //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        //   );
        } else {
            console.log("Map permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

export default function gpsAttempt() {
    getPermission();
}