import { View, Text } from "react-native";
import {styles} from "./AddRestaurantScreen.styles"
import { InfoForm } from "../../../components/Restaurants/AddRestaurant/InfoForm";
import { Button } from "react-native-elements";

export function AddRestaurantScreen() {
  return (
    <View style={styles.content}>
      <InfoForm/>

      <Button title="Crear restaurante" buttonStyle={styles.addRestaurant}/>
    </View>
  );
}
