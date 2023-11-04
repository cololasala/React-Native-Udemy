import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "./ListRestaurants.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

export function ListRestaurants({ restaurants }) {
  const navigation = useNavigation();

  const gotToRestaurant = (restaurant) => {
    navigation.navigate(screen.restaurant.restaurant, { id: restaurant.id }); //pasaje por parametro
  };

  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={(doc) => {
          const restaurant = doc.item;
          return (
            <TouchableOpacity onPress={() => gotToRestaurant(restaurant)}>
              <View style={styles.restaurant}>
                <Image
                  source={{ uri: restaurant.images[0] }}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.name}>{restaurant.name}</Text>
                  <Text style={styles.info}>{restaurant.address}</Text>
                  <Text style={styles.info}>{restaurant.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
