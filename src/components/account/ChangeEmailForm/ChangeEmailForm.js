import { View } from "react-native";
import { useState } from "react";
import { Button, Input } from "react-native-elements";
import { styles } from "./ChangeEmailForm.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeEmailForm.data";
import Toast from "react-native-toast-message";
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

export function ChangeEmailForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        const { email, password } = formValue;
        const currentUser = getAuth().currentUser;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        await reauthenticateWithCredential(currentUser, credential);
        await verifyBeforeUpdateEmail(currentUser, email);
        onClose();
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Verifique su nuevo email y vuelva a ingresar",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al editar la contraseña",
        });
      }
    },
  });

  const showHidePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nuevo email"
        containerStyle={styles.input}
        rightIcon={{
            type: "material-community",
            name: "at",
            color: "#c2c2c2",
          }}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={!showPassword}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => showHidePassword(),
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Button
        title="Editar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
