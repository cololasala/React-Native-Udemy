import { View, Text } from "react-native";
import React from "react";
import { styles } from "./Header.styles";
import { Rating } from "react-native-elements";

export function Header({ restaurant }) {
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Rating imageSize={20} readOnly startingValue={restaurant.ratingMedia || 0} />
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}