import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserLoggedScreen } from "./user-logged-screen/UserLoggedScreen";
import { UserGuestScreen } from "./user-guest-screen/UserGuestScreen";
import { LoadingModal } from "../../components/shared";

LogBox.ignoreAllLogs(); //evita warnings en el emulador

export function AccountScreen() {
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setHasLogged(Boolean(user));
    });
  }, []);

  if (hasLogged === null) {
    return <LoadingModal text="cargando" />;
  }

  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />;
}
