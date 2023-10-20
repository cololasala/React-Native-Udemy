import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserLoggedScreen } from "./UserLoggedScreen";
import { UserGuestScreen } from "./UserGuestScreen";
import { LoadingModal } from "../../components/Shared";

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
