import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserNotLogged } from "../components/Favorites/UserNotLogged";
import {
  getDocs,
  where,
  collection,
  query,
  onSnapshot,
  Query,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../utils";
import { Loading } from "../components/Shared/Loading";
import { NotFoundRestaurants } from "../components/Favorites/NotFoundRestaurants";
import { RestaurantFavorites } from "../components/Favorites/RestaurantFavorites";

export function FavoritesScreen() {
  const [isLogged, setIsLogged] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLogged(Boolean(user));
    });
  }, []);

  useEffect(() => {
    if (isLogged) {
      setLoading(true);
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, async (snaphot) => {
        let restuarantArray = [];
        for await (const item of snaphot.docs) {
          const data = item.data();
          const docRef = doc(db, "restaurants", data.idRestaurant);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;
          restuarantArray.push(newData);
        }
        setRestaurants(restuarantArray);
        setLoading(false);
      });
    }
  }, [isLogged]);

  if (!isLogged) {
    return <UserNotLogged />;
  }

  if (isLogged && loading) return <Loading show text="Cargando favoritos" />;

  if (isLogged && restaurants.length === 0) return <NotFoundRestaurants />;

  if (restaurants.length > 0 && !loading) {
    return (
      <ScrollView>
        {restaurants.map((r) => (
          <RestaurantFavorites key={r.id} restaurant={r} />
        ))}
      </ScrollView>
    );
  }
}
