import { View, Text } from "react-native";
import React from "react";
import { styles } from "./NotFoundRestaurants.styles";
import { Icon } from "react-native-elements";

export function NotFoundRestaurants() {
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80}/>
      <Text style={styles.textInfo}>No tienes restaurantes en favoritos</Text>
    </View>
  );
}
