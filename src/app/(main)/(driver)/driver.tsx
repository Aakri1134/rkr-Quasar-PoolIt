import { Link, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { ScrollView } from "react-native-virtualized-view";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../../../constants/MapViewStyle.json"
import DriverMap from "@/src/components/DriverMap";
import axios from "axios";
import StartRide from "@/src/components/StartRide";
import NearbyPassengers from "@/src/components/NearbyPassengers";

export default function DriverScreen() {
  const [state, setState] = useState({
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
    passenger1Cords: {
      pickupCords: {
        latitude: 0,
        longitude: 0,
      },
      destinationCords: {
        latitude: 0,
        longitude: 0,
      },
    },
    passenger2Cords: {
      pickupCords: {
        latitude: 0,
        longitude: 0,
      },
      destinationCords: {
        latitude: 0,
        longitude: 0,
      },
    },
    passenger3Cords: {
      pickupCords: {
        latitude: 0,
        longitude: 0,
      },
      destinationCords: {
        latitude: 0,
        longitude: 0,
      },
    },
    destinationCords: {
      latitude: 0,
      longitude: 0,
    },
  });

  const [hasStartedRide, setHasStartedRide] = useState(false);

  const [currentLocation, setCurrentLocation] = useState({});

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  async function putCurrentLocation() {
    let location = await Location.getCurrentPositionAsync({});

    setState({
      ...state,
      currentLocation: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  }

  async function getCurrentLocation() {
    let location = await Location.getCurrentPositionAsync({});


    setState({
      ...state,
      currentLocation: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  }

  function fetchDestination(data, details) {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  }

  

 function hasStartedRidefun(){
  setHasStartedRide(true);
 }
 function hasStoppedRidefun(){
  setHasStartedRide(false);
 }


  return (
    <View style={{ flex: 1, marginTop:50}}>
      <ScrollView 
      style={{ backgroundColor: "white" , flex:1}}
      keyboardShouldPersistTaps="handled"
      >
      {!hasStartedRide && <StartRide fetchDestination={fetchDestination} hasStartedRidefun={hasStartedRidefun} />}
      {hasStartedRide && <NearbyPassengers hasStoppedRidefun={hasStoppedRidefun} destinationCoords = {state.destinationCords}/>}
      
      </ScrollView>
      <DriverMap latitude = {state.destinationCords.latitude} longitude = {state.destinationCords.longitude} />
    </View>
  );
}
