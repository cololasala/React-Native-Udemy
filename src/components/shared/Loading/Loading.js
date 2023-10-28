import { View, Text } from "react-native";
import React from "react";
import { styles } from "./Loading.styles";
import { ActivityIndicator } from "react-native";

export function Loading({ show, text }) {
  if (!show) return null;

  return (
    <View style={styles.content}>
      <ActivityIndicator size="large" color="#00a680" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}
