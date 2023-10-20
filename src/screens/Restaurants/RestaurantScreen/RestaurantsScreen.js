import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { screen } from "../../../utils/screenName";
import { styles } from "./RestaurantScreen.styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function RestaurantsScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //verifica si se cambio de user
      setCurrentUser(user);
    });
  }, []);

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant); //navegamos a otro screen dentro de nuestro stack
    // navigation.navigate(screen.account.tab, { screen: screen.account.account});
  };

  return (
    <View style={styles.content}>
      <Text>Estamos en la screen de Restaurants</Text>

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  );
}
