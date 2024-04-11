import PropTypes from "prop-types";
import React, { useCallback } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { useActionSheet } from "@expo/react-native-action-sheet";
import { pickImage, takePicture } from "../lib";

interface Props {
  renderIcon?: () => React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconTextStyle?: StyleProp<TextStyle>;
  onSend: (messages: any) => void;
}

const Actions = ({
  renderIcon,
  iconTextStyle,
  containerStyle,
  wrapperStyle,
  onSend,
}: Props) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onActionsPress = useCallback(() => {
    const options = ["Escoger de mi galería", "Tomar Foto", "Cancelar"];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage(onSend);
            return;
          case 1:
            takePicture(onSend);
            return;
        }
      }
    );
  }, [showActionSheetWithOptions]);

  const renderIconComponent = useCallback(() => {
    if (renderIcon) {
      return renderIcon();
    }
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    );
  }, []);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onActionsPress}
    >
      <>{renderIconComponent()}</>
    </TouchableOpacity>
  );
};

export default Actions;

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});
