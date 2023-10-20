import { View, Text } from "react-native";
import React from "react";
import { Input } from "react-native-elements";
import {styles} from "./InfoForm.styles";

export function InfoForm() {
  return (
    <View>
      <Input placeholder="Nombre" />
      <Input placeholder="Dirección" />
      <Input placeholder="Descripción" multiline={true} inputContainerStyle={styles.textArea}/>
    </View>
  );
}
