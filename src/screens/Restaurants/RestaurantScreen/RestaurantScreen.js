import { ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../utils";
import { styles } from "./RestaurantScreen.styles";
import { Carousel } from "../../../components/Shared/Corousel/Carousel";
import { Loading } from "../../../components/Shared/Loading/Loading";
import { Header } from "../../../components/Restaurant/Header";
import { Info } from "../../../components/Restaurant/Info";
import { Reviews } from "../../../components/Restaurant/Reviews/Reviews";
import {BtnFavorite} from "../../../components/Restaurant/BtnFavorite";

const widthScren = Dimensions.get("window").width;

export function RestaurantScreen({ route }) {
  //este route es propio de props
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const restaurantQuery = query(
      collection(db, "restaurants"),
      where("id", "==", route.params.id)
    );

    getDocs(restaurantQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setRestaurant(doc.data());
        });
      })
      .catch((error) => {
        console.error("Error obteniendo restaurantes: ", error);
      });
  }, [route]);

  if(!restaurant) return <Loading show={true} text="Cargando restaurante" />

  return (
    <ScrollView style={styles.content}>
      <Carousel
        arrayImages={restaurant.images}
        height={250}
        width={widthScren}
        hideDots={false}
      />

      <Header restaurant={restaurant}/>
      <Info restaurant={restaurant}/>
      <Reviews restaurant={restaurant}/>
      <BtnFavorite restaurant={restaurant}/>
    </ScrollView>
  );
}
