import { View, Text } from "react-native";
import React from "react";
import { styles } from "./ChangeDisplayName.styles";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeDisplayName.data";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";

export function ChangeDisplayName({ onClose, onReload }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false, //solo valida cuando se mande con el boton
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, { displayName });
        onReload();
        onClose();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al editar nombre y apellido",
        });
      }
    },
  });
  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre y apellidos"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Editar nombre y apellidos"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
