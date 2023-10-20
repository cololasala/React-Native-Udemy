import { View, Text } from "react-native";
import React from "react";
import { ListItem, Icon } from "react-native-elements";
import { Modal } from "../Shared/Modal";
import { useState } from "react";
import { ChangeDisplayName } from "./ChangeDisplayName";
import { ChangeEmailForm } from "./ChangeEmailForm";
import { ChangePasswordForm } from "./ChangePasswordForm";

export function AccountOptions({ onReload }) {
  const [showModal, setShowModal] = useState(false);
  const [renderModal, setRenderModal] = useState(null);

  const onCloseModal = () => setShowModal(false);

  const selectedComponent = (key) => {
    if (key === "displayName") {
      setRenderModal(
        <ChangeDisplayName onClose={onCloseModal} onReload={onReload} />
      );
    }
    if (key === "email") {
      setRenderModal(<ChangeEmailForm onClose={onCloseModal} />);
    }
    if (key === "password") {
      setRenderModal(<ChangePasswordForm onClose={onCloseModal} />);
    }
    setShowModal(true);
  };
  const menuOptions = getMenuOptions(selectedComponent);

  return (
    <View>
      {menuOptions.map((m, index) => (
        <ListItem key={index} bottomDivider onPress={m.onPress}>
          <Icon
            type={m.iconType}
            name={m.iconNameLeft}
            color={m.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{m.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={m.iconType}
            name={m.iconNameRight}
            color={m.iconColorRight}
          />
        </ListItem>
      ))}

      <Modal show={showModal} close={() => setShowModal(false)}>
        {renderModal}
      </Modal>
    </View>
  );
}

const getMenuOptions = (selectedComponent) => {
  return [
    {
      title: "Cambiar nombres y apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
  ];
};
