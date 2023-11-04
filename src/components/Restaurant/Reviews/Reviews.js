import { View } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./Review.styles";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Loading } from "../../Shared/Loading";
import { Text, Avatar, ListItem, AirbnbRating } from "react-native-elements";

export function Reviews({ restaurant }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", restaurant.id),
      orderBy("createAt")
    );

    onSnapshot(q, (snaphot) => {
      setReviews(snaphot.docs);
    });
  }, [restaurant]);

  if (!reviews) {
    return <Loading show={true} text="Cargando reviews" />;
  }

  return (
    <View style={styles.content}>
      {reviews.map((r, index) => {
        const data = r.data();
        return (
          <ListItem key={index} bottomDivider containerStyle={styles.review}>
            <Avatar source={{ uri: data.avatarUser }} size={50} rounded />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View>
                <Text>{data.comment}</Text>
              </View>
              <View style={styles.contentRating}>
                <AirbnbRating defaultRating={data.rating} showRating={false} size={15} isDisabled/>
                <Text style={styles.date}>{new Date(data.createAt.seconds * 1000).toLocaleDateString("es-Ar").split("T")[0]}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}
