import { StyleSheet, Dimensions } from "react-native";

const widthScreen = Dimensions.get("window").width; // ancho responsive (total de toda la pantalla)

export const styles = StyleSheet.create({
  content: {
    marginBottom: 20,
  },
  imageStyle: {
    height: 200,
    width: widthScreen,
  }
});
