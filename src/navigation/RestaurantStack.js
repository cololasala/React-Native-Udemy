import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils/screenName";
import { RestaurantScreen } from "../screens/Restaurants/RestaurantScreen";
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen";
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen";
import { AddReviewRestaurantScreen } from "../screens/Restaurants/AddReviewRestaurantScreen";

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
      <Stack.Screen
        name={screen.restaurant.restaurant}
        component={RestaurantScreen}
        options={{ title: "Restaurante" }}
      />
      <Stack.Screen
        name={screen.restaurant.addReview}
        component={AddReviewRestaurantScreen}
        options={{ title: "Nueva opinión" }}
      />
    </Stack.Navigator>
  );
}
