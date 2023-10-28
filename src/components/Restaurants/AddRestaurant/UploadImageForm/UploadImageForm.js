import { Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./UploadImageForm.styles";
import { Avatar, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
import { LoadingModal } from "../../../Shared/LoadingModal";
import { ScrollView } from "react-native";
import { Alert } from "react-native";

export function UploadImageForm({ formik }) {
  const [isLoading, setIsLoading] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const fileBlob = await response.blob();
      const storage = getStorage();

      const storageRef = ref(storage, `restaurants/${uuid.v4()}`);
      uploadBytes(storageRef, fileBlob).then((snaphot) => {
        updatePhotosRestaurant(snaphot.metadata.fullPath);
      });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al subir imagen",
      });
    }
  };

  const updatePhotosRestaurant = async (path) => {
    const storage = getStorage();
    const imageRef = ref(storage, path); // buscamos la imagen en nuestro storage a traves de su path

    const imageUrl = await getDownloadURL(imageRef); //obtengo la url de mi imagen en firabase
    formik.setFieldValue("images", [...formik.values.images, imageUrl]); //agregamos al form la imagen subida

    setIsLoading(false);

    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Imagen subida exitosamente",
    });
  };

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro que desea eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "Cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            const images = formik.values.images.filter((i) => i !== image);
            formik.setFieldValue("images", images);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />

        {formik.values.images.map((image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.avatarImage}
            onPress={() => removeImage(image)}
          />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={isLoading} text="Subiendo imagen" />
    </>
  );
}
