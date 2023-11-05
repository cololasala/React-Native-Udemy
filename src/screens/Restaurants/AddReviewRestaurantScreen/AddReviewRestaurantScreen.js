import { View } from "react-native";
import React from "react";
import { styles } from "./AddReviewRestaurantScreen.styles";
import { AirbnbRating, Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./AddReviewRestaurantScreen.data";
import Toast from "react-native-toast-message";
import { getAuth } from "firebase/auth";
import uuid from "react-native-uuid";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { mean } from "lodash";

export function AddReviewRestaurantScreen({ route }) {
  const idRestaurant = route.params.id;
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const newData = formValue;
        newData.id = uuid.v4(); // id de la nueva opinion
        newData.idRestaurant = idRestaurant; //id del restaurante
        newData.createAt = new Date();
        newData.idUser = auth.currentUser.uid; // para saber que user emitio la opinion
        newData.avatarUser = auth.currentUser.photoURL;

        const database = doc(db, "reviews", newData.id); //base de firesabe
        await setDoc(database, newData); // agregamos una nueva opinion
        await updateRestaurant(); // actualiza el rating promedio del restaurante
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al guardar opinión",
        });
      }
    },
  });

  const updateRestaurant = () => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", idRestaurant)
    );

    getDocs(q).then(async (snaphot) => {
      const reviews = snaphot.docs;
      const arrayStars = reviews.map((r) => r.data().rating);
      const media = mean(arrayStars);
      const restaurantRef = doc(db, "restaurants", idRestaurant);
      await updateDoc(restaurantRef, {
        ratingMedia: media,
      });

      navigation.goBack();
    });
  };

  const setRating = (rating) => {
    formik.setFieldValue("rating", rating);
  };

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            reviews={[
              "Pésimo",
              "Deficiente",
              "Normal",
              "Muy bueno",
              "Exelente",
            ]}
            defaultRating={0}
            size={35}
            onFinishRating={(rating) => setRating(rating)}
          />
        </View>
        <View>
          <Input
            placeholder="Título"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>
      <Button
        title="Enviar opinión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
