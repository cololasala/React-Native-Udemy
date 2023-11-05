import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Icon, ListItem, SearchBar } from "react-native-elements";
import {
  collection,
  startAt,
  query,
  limit,
  orderBy,
  endAt,
  getDocs,
} from "firebase/firestore";
import { db, screen } from "../utils";
import { size } from "lodash";
import { Loading } from "../components/Shared/Loading";
import { useNavigation } from "@react-navigation/native";

export function SearchScreen() {
  const [searchResults, setSearhResults] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("name"),
        startAt(searchText), //se necesitan startAt y endAt para buscar
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnaphot = await getDocs(q);
      setSearhResults(querySnaphot.docs);
      setLoading(false);
    })();
  }, [searchText]);

  const goToRestaurant = (idRestaurant) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: idRestaurant,
      },
    });
  };

  if (loading) return <Loading show text="Cargando restaurants" />;

  return (
    <>
      <SearchBar
        placeholder="Buscar restaurante"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <ScrollView>
        {size(searchResults) === 0 ? (
          <View>
            <Text>No se encontraron resultados </Text>
          </View>
        ) : (
          <View>
            {searchResults.map((item) => {
              const data = item.data();

              return (
                <ListItem
                  key={data.id}
                  bottomDivider
                  onPress={() => goToRestaurant(data.id)}
                >
                  <Avatar source={{ uri: data.images[0] }} rounded />
                  <ListItem.Content>
                    <Text>{data.name}</Text>
                  </ListItem.Content>
                  <Icon type="material-community" name="chevron-right" />
                </ListItem>
              );
            })}
          </View>
        )}
      </ScrollView>
    </>
  );
}
