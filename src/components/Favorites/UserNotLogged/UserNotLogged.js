import { View, Text } from "react-native";
import React from "react";
import { styles } from "./UserNotLogged.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { Icon } from "react-native-elements";
import { Button } from "react-native-elements";

export function UserNotLogged() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, {
      screen: screen.account.login,
    });
  };

  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80}/>
      <Text style={styles.textInfo}>Necesitas estar logeado para poder ver esta sección</Text>
      <Button title="Ir al login" containerStyle={styles.containerBtn} buttonStyle={styles.btn} onPress={goToLogin}/>
    </View>
  );
}
