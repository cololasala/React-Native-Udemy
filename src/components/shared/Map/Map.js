import { View, Text } from "react-native";
import React from "react";
import { styles } from "./Map.styles";
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";

export function Map({ restaurant }) {
  const openAppMap = () => {
    openMap({
      latitude: restaurant.location.latitude,
      longitude: restaurant.location.longitude,
      zoom: 19,
      query: restaurant.name
    });
  };

  return (
    <MapView
      style={styles.content}
      initialRegion={JSON.parse(restaurant.location)}
      onPress={openAppMap}
    >
      <Marker coordinate={JSON.parse(restaurant.location)} />
    </MapView>
  );
}
