import { View } from "react-native";
import React, { useState } from "react";
import { Input } from "react-native-elements";
import { styles } from "./InfoForm.styles";
import { MapForm } from "../MapForm";

export function InfoForm({ formik }) {
  const [showMap, setShowMap] = useState(false);
  const onOpenCloseMap = () => {
    setShowMap((prevState) => !prevState);
  };

  return (
    <View>
      <Input
        placeholder="Nombre"
        onChangeText={(text) => formik.setFieldValue("name", text)}
        errorMessage={formik.errors.name}
      />
      <Input
        placeholder="Dirección"
        rightIcon={{
          type: "material-community",
          name: "map-marker-radius",
          color: getColorIconMap(formik),
          onPress: onOpenCloseMap,
        }}
        onChangeText={(text) => formik.setFieldValue("address", text)}
        errorMessage={formik.errors.address}
      />
      <Input
        placeholder="Telefóno"
        onChangeText={(text) => formik.setFieldValue("phone", text)}
        errorMessage={formik.errors.phone}
      />
      <Input
        placeholder="Email"
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Descripción"
        inputContainerStyle={styles.textArea}
        multiline={true}
        onChangeText={(text) => formik.setFieldValue("description", text)}
        errorMessage={formik.errors.description}
      />

      <MapForm formik={formik} show={showMap} close={onOpenCloseMap} />
    </View>
  );
}

getColorIconMap = (formik) => {
  if (formik.errors.location) {
    return "#ff0000";
  }

  if (formik.values.location) {
    return "#00a680";
  }

  return "#c2c2c2";
};
