import { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./RestaurantsScreen.styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { screen, db } from "../../../utils";
import { LoadingModal } from "../../../components/Shared";
import { ListRestaurants } from "../ListRestaurants/ListRestaurants";

export function RestaurantsScreen(props) {
  const { navigation, route } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //verifica si se cambio de user
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    console.log("entro en rest")
    const getRestaurantsQuery = query(
      collection(db, "restaurants"),
      orderBy("createAt")
    );

    const restaurants = [];
    getDocs(getRestaurantsQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          restaurants.push(doc.data());
        });
        setRestaurants(restaurants);
      })
      .catch((error) => {
        console.error("Error obteniendo restaurantes: ", error);
      });
  }, []);

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant); //navegamos a otro screen dentro de nuestro stack
    // navigation.navigate(screen.account.tab, { screen: screen.account.account});
  };

  return (
    <View style={styles.content}>
      
      {!restaurants ? (
        <LoadingModal show={true} text="Cargando" />
      ) : (
        <ListRestaurants restaurants={restaurants} />
      )}

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
