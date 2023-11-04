import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./BtnRevieverForm.styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen, db } from "../../../utils";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { size } from "lodash";

export function BtnRevieverForm({ restaurant }) {
  const [isLogged, setIsLogged] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLogged(Boolean(user));
    });
  }, []);

  useEffect(() => {
    if (isLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", restaurant.id),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snaphot) => {
        if (size(snaphot.docs) > 0) setHasReview(true); //chequea si el usuario ha hecho ya un review de ese restaurant
      });
    }
  }, [isLogged]);

  const gotToLogin = () => {
    navigation.navigate(screen.account.tab, { screen: screen.account.login });
  };

  const goToAddReview = () => {
    navigation.navigate(screen.restaurant.addReview, { id: restaurant.id });
  };

  if (hasReview) {
    return (
      <View style={styles.content}>
        <Text style={styles.text}>Ya has enviado una opinion de este restaurante</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {isLogged ? (
        <Button
          title="Escribe una opinión"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          titleStyle={styles.styleBtnText}
          buttonStyle={styles.button}
          onPress={goToAddReview}
        ></Button>
      ) : (
        <Text style={styles.text}>
          Si deseas escribir una opinión es necesario haber ingresado
          <Text style={styles.textClick} onPress={gotToLogin}>
            {" "}
            pulsa AQUÍ para iniciar sesión
          </Text>
        </Text>
      )}
    </View>
  );
}
