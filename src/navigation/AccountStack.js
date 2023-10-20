import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils/screenName";
import { AccountScreen } from "../screens/Account/AccountScreen";
import { LoginScreen } from "../screens/Account/LoginScreen";
import { RegisterScreen } from "../screens/Account/RegisterScreen";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{ title: "Cuenta" }}
      ></Stack.Screen>
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
        options={{ title: "Iniciar sesión" }}
      ></Stack.Screen>
      <Stack.Screen
        name={screen.account.register}
        component={RegisterScreen}
        options={{ title: "Registrarse" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
