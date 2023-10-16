import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils/screenName";
import { RankingScreen } from "../screens/RankingScreen";

const Stack = createNativeStackNavigator();

export function RankingStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        name={screen.ranking.ranking}
        component={RankingScreen}
        options={{ title: "Ranking" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
