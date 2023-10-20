import { ScrollView, View, Text } from "react-native";
import { Image } from "react-native-elements";
import React from "react";
import { styles } from "./LoginScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { LoginForm } from "../../../components/Auth/LoginForm";

export function LoginScreen() {
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  };

  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/images/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta?{" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Registrarse
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
