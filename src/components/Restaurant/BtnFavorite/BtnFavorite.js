import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./BtnFavorite.styles";
import { Icon } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
  setDoc,
  doc,
  getDocs,
  where,
  query,
  collection,
  deleteDoc,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";
import { db } from "../../../utils";
import { size } from "lodash";

export function BtnFavorite({ restaurant }) {
  const auth = getAuth();
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getFavorites();
      if (size(response) > 0) {
        //si se cumple el user tiene marcado el restaurant como favorito
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    })();
  }, [restaurant, isReload]);

  const onReload = () => setIsReload((prev) => !prev);

  const getFavorites = async () => {
    const q = query(
      collection(db, "favorites"),
      where("idRestaurant", "==", restaurant.id),
      where("idUser", "==", auth.currentUser.uid)
    );
    const result = await getDocs(q);
    return result.docs; //retorna los docs
  };

  const addToFavorite = async () => {
    try {
      const idFavorite = uuid.v4();
      const data = {
        id: idFavorite,
        idRestaurant: restaurant.id,
        idUser: auth.currentUser.uid,
      };
      await setDoc(doc(db, "favorites", idFavorite), data);
      onReload();
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al añadir a favoritos",
      });
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await getFavorites();
      response.forEach(async (item) => {
        await deleteDoc(doc(db, "favorites", item.id));
        onReload();
      });
      
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al eliminar de favoritos",
      });
    }
  };

  return (
    <View style={styles.content}>
      <Icon
        type="material-community"
        name={isFavorite ? "heart" : "heart-outline"}
        size={35}
        color={isFavorite ? "#f00" : "#000"}
        onPress={isFavorite ? removeFavorite : addToFavorite}
      />
    </View>
  );
}
