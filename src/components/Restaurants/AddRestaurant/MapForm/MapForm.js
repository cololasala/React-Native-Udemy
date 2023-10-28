import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-toast-message";
import { View } from "react-native";
import { styles } from "./MapForm.styles";
import { Modal } from "../../../Shared/Modal";

export function MapForm({ show, close, formik }) {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Debes activar la localización en ajustes",
        });
        return;
      }
      const locationTemp = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
    })();
  }, []);

  saveLocation = () => {
    formik.setFieldValue("location", JSON.stringify(location)); //necesito guardar un string
    close();
  };

  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showsUserLocation={true}
        style={styles.mapStyle}
        onRegionChange={(locationTemp) => setLocation(locationTemp)}
      >
        <Marker draggable coordinate={location} />
      </MapView>
      <View style={styles.mapActions}>
        <Button
          title="Cancelar"
          containerStyle={styles.btnContainerCancel}
          buttonStyle={styles.btnCancel}
          onPress={close}
        ></Button>
        <Button
          title="Guardar"
          containerStyle={styles.btnContainerSave}
          buttonStyle={styles.btnSave}
          onPress={saveLocation}
        ></Button>
      </View>
    </Modal>
  );
}
