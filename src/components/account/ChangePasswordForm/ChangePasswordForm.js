import { View } from "react-native";
import { useState } from "react";
import { styles } from "./ChangePasswordForm.styles";
import { Button, Input } from "react-native-elements";
import { initialValues, validationSchema } from "./ChangePassword.data";
import { useFormik } from "formik";
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import Toast from "react-native-toast-message";

export function ChangePasswordForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        const {password, newPassword } = formValue;
        const currentUser = getAuth().currentUser;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
        onClose();
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Contraseña editada exitosamente",
        });
      } catch (error) {
        console.log(error)
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al editar el email",
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
        placeholder="Contraseña actual"
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
      <Input
        placeholder="Contraseña nueva"
        secureTextEntry={!showPassword}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => showHidePassword(),
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Confirmar contraseña nueva"
        secureTextEntry={!showPassword}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => showHidePassword(),
        }}
        onChangeText={(text) =>
          formik.setFieldValue("confirmNewPassword", text)
        }
        errorMessage={formik.errors.confirmNewPassword}
      />

      <Button
        title="Editar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
