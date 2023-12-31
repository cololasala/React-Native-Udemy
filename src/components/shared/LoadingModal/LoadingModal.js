import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "./LoadingModal.styles";
import { Overlay } from "react-native-elements";

export function LoadingModal(props) {
  const { show, text } = props;

  return (
    <Overlay
      isVisible={show}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

LoadingModal.defaultProps = {
  show: false,
};
