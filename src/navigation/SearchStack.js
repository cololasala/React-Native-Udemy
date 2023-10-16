import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils/screenName";
import { SearchScreen } from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

export function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        name={screen.search.search}
        component={SearchScreen}
        options={{ title: "Buscar" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
