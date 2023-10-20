import { View, Text } from "react-native";
import { styles } from "./InfoUser.styles";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";

export function InfoUser({ setLoading, setLoadingText }) {
  const { uid, photoURL, email, displayName } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, //permite edicion
      aspect: [4, 3], //aspecto cuadrado de 4*3
    });
    if (!result.canceled) uploadImage(result.uri);
  };

  const uploadImage = async (uri) => {
    try {
      setLoading(true);
      setLoadingText("Actualizando avatar");
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage(); //obtengo instacia de mi storage firebase
      const storageRef = ref(storage, `avatar/${uid}`);

      uploadBytes(storageRef, blob).then((snaphot) => {
        updateAvatar(snaphot.metadata.fullPath);
      });
    } catch (err) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al subir imagen",
      });
    }
  };

  const updateAvatar = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageUrl });
    setAvatar(imageUrl);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        source={
          avatar
            ? { uri: avatar }
            : require("../../../../assets/images/empty-user.png")
        }
      >
        <Avatar.Accessory size={24} onPress={changeAvatar}></Avatar.Accessory>
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
