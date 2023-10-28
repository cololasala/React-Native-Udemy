import { View } from "react-native";
import React from "react";
import { styles } from "./ImageRestaurant.styles";
import { Image } from "react-native-elements";

export function ImageRestaurant({ formik }) {
  const primaryImage = formik.values.images[0];

  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../../assets/images/image-not-found.jpg")
        }
        style={styles.imageStyle}
      />
    </View>
  );
}
