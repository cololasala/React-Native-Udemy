import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { RestaurantRanking } from "../components/Restaurants/RestaurantRanking/RestaurantRanking";
import { db } from "../utils";
import { Loading } from "../components/Shared/Loading";

export function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("ratingMedia", "desc"), //traemos todos los reastaurantes puntuados de manera desc (mayor a menor)
      limit(10) //limite de los que me trae
    );

    onSnapshot(q, (snaphot) => {
      setRestaurants(snaphot.docs);
      setLoading(false)
    });
  }, []);

  if(loading) return <Loading show text="Cargando restaurants"/>

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {restaurants.map((r, index) => (
        <RestaurantRanking key={r.id} index={index} restaurant={r.data()} />
      ))}
    </ScrollView>
  );
}
