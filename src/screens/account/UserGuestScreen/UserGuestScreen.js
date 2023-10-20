import { View, Text, ScrollView, Image, Button } from "react-native";
import { styles } from "./UserGuestScreen.styles";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

export function UserGuestScreen() {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  }

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image source={require('../../../../assets/images/user-guest.png')} style={styles.image}/>
      <Text style={styles.title}>Consultar tu perfil de 5 tenedores</Text>
      <Text style={styles.description}>
        ¿Como describirías tu mejor restaurante?, Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota por cual te ha gustado más y
        comenta como ha sido tu experiencia.
      </Text>
        <Button title="Ver tu perfil" onPress={goToLogin} style={styles.btnStyle} color="#00a680"></Button>
    </ScrollView>
  );
}
