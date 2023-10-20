import { View } from "react-native";
import React, { useState } from "react";
import { InfoUser } from "../../../components/Account/InfoUser/InfoUser";
import { styles } from "./UserLoggedScreen.styles";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import Toast from "react-native-toast-message";
import { LoadingModal } from "../../../components/Shared/LoadingModal/LoadingModal";
import { AccountOptions } from "../../../components/Account";

export function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [reload, setReload] = useState(false); //lo usamos para que se recargue el componente en base a un cambio de algun form

  const reloadComponent = () => setReload((prevState) => !prevState);
  const logout = () => {
    try {
      const auth = getAuth();
      signOut(auth);
    } catch (err) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al hacer cerrar sesión",
      });
    }
  };

  return (
    <View style={styles.content}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      <AccountOptions onReload={reloadComponent}/>
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btn}
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}
