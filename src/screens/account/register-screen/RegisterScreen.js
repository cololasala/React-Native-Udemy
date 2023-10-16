import { View } from "react-native";
import React from "react";
import { styles } from "./RegisterScren.styles";
import { Image } from "react-native-elements";
import { RegisterForm } from "../../../components/auth/register-form/RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../../assets/images/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
