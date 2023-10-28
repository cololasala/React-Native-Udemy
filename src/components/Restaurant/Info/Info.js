import { View, Text } from "react-native";
import React from "react";
import { styles } from "./Info.styles";
import { Icon, ListItem } from "react-native-elements";
import { Map } from "../../Shared/Map";

export function Info({ restaurant }) {
  const listInfo = [
    {
      text: restaurant.address,
      iconType: "material-community",
      iconName: "map-marker",
    },
    {
      text: restaurant.phone,
      iconType: "material-community",
      iconName: "phone",
    },
    {
      text: restaurant.email,
      iconType: "material-community",
      iconName: "at",
    },
  ];
  
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el restaurante</Text>
      {restaurant.title}
      <Map restaurant={restaurant} />
      {listInfo.map((e, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={e.iconType} name={e.iconName} color="#00a680" />
          <ListItem.Content>
            <ListItem.Title>{e.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
