import React, { ReactNode } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../styles/styles";

export function Button(props: {
  children?: ReactNode[] | ReactNode;
  variant?: "contained" | "outlined";
  onClick?: () => void;
  style?: any;
  disabled?: boolean;
}) {
  const { children, variant, onClick, style, disabled } = props;

  const styles = StyleSheet.create({
    button: {
      minHeight: 56,
      borderRadius: 20,
      minWidth: 20,
      backgroundColor: variant === "contained" ? colors.primary_dark : "",
      borderColor: variant === "outlined" ? colors.primary_dark : "",
      borderWidth: variant === "outlined" ? 2 : 0,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 5,
      opacity: disabled ? 0.5 : 1,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onClick}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
}
