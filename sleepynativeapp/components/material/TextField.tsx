import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { colors } from "../../styles/styles";

export function TextField(props: {
  onChange?: (arg: string) => void;
  value: string;
  placeholderText?: string;
  editable?: boolean;
  style?: any;
  textColor?: "white" | "black";
  password?: boolean;
}) {
  const {
    onChange,
    value,
    placeholderText,
    style,
    editable,
    textColor,
    password,
  } = props;

  const styles = StyleSheet.create({
    wrapper: {
      justifyContent: "center",
      backgroundColor: colors.primary,
      height: 56,
      width: "100%",
      maxWidth: "100%",
      borderRadius: 20,
      marginVertical: 5,
      paddingHorizontal: 10,
    },
    text: {
      fontWeight: "400",
      fontSize: 16,
      color: textColor === "white" ? colors.text_white : colors.text_primary,
    },
  });

  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        style={styles.text}
        value={value}
        onChangeText={onChange}
        editable={editable}
        placeholder={placeholderText}
        placeholderTextColor={colors.text_secondary}
        secureTextEntry={password}
      />
    </View>
  );
}
