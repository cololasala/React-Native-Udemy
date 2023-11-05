import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./RestaurantRanking.styles";
import { Icon, Rating } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function RestaurantRanking({ restaurant, index }) {
  const navigation = useNavigation();

  const goToRestaurant = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurant.id,
      },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null; // si ocurre esto el restaurant no tendra una medalla

    const medalColor =
      index === 0 ? "#FFD700" : index === 1 ? "#BEBEBE" : "#CD7F32";
    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={medalColor}
        containerStyle={styles.iconMedal}
      />
    );
  };
  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.content}>
        <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.titleName}>{restaurant.name}</Text>
          </View>

          <Rating
            imageSize={15}
            readOnly
            startingValue={restaurant.ratingMedia}
          />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
