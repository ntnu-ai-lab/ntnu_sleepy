import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";
import { colors } from "../../styles/styles";

export function TextField(props: {
  onChange?: (arg: string) => void;
  onEndEditing?: (
    arg: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => void;
  value: string;
  placeholderText?: string;
  editable?: boolean;
  style?: any;
  textColor?: "white" | "black";
  password?: boolean;
  error?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
}) {
  const {
    onChange,
    onEndEditing,
    value,
    placeholderText,
    style,
    editable,
    textColor,
    password,
    error,
    multiline,
    keyboardType,
  } = props;

  const styles = StyleSheet.create({
    wrapper: {
      justifyContent: multiline ? "flex-start" : "center",
      backgroundColor: colors.primary,
      borderWidth: error ? 2 : 0,
      borderColor: error ? colors.error : "",
      height: multiline ? 112 : 56,
      width: "100%",
      maxWidth: "100%",
      borderRadius: 20,
      marginVertical: 5,
      paddingHorizontal: 14,
      paddingVertical: multiline ? 5 : 0,
    },
    text: {
      fontWeight: "400",
      fontSize: 16,
      color: editable === false ? colors.text_secondary : textColor === "white" ? colors.text_white : colors.text_primary,
      height: "100%",
    },
  });

  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        onEndEditing={onEndEditing}
        style={styles.text}
        value={value}
        onChangeText={onChange}
        editable={editable}
        placeholder={placeholderText}
        placeholderTextColor={colors.text_secondary}
        secureTextEntry={password}
        multiline={multiline}
        keyboardType={keyboardType}
        // numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );
}
