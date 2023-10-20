import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils/screenName";
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantScreen";
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurant";

const Stack = createNativeStackNavigator();

export function RestaurantStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        name={screen.restaurant.restaurants}
        component={RestaurantsScreen}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name={screen.restaurant.addRestaurant}
        component={AddRestaurantScreen}
        options={{ title: "Nuevo restaurante" }}
      />
    </Stack.Navigator>
  );
}
