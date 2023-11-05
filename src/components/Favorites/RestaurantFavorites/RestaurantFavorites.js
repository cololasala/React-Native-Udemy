import { View, Text } from "react-native";
import React from "react";
import { styles } from "./RestaurantFavorites.styles";
import { TouchableOpacity } from "react-native";
import { Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { doc, deleteDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

export function RestaurantFavorites({ restaurant }) {
  const navigation = useNavigation();

  const goToRestaurant = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurant.id,
      },
    });
  };

  const removeFavorite = async () => {
    try {
      console.log(restaurant)
      await deleteDoc(doc(db, "favorites", restaurant.idFavorite));
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al eliminar de favoritos",
      });
    }
  };

  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.content}>
        <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={removeFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
