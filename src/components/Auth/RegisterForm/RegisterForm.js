import { View } from "react-native";
import React, { useState } from "react";
import { styles } from "./RegisterForm.styles";
import { Button, Icon, Input } from "react-native-elements";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.account.account);
      } catch (err) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrar usuario",
        });
      }
    },
  });

  const showHidePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={showHidePassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.input}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={showHidePassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        color="#00a680"
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
