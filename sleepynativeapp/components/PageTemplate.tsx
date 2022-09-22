import React, { ReactNode } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { colors } from "../styles/styles";

export function PageTemplate(props: {
  children: ReactNode[] | ReactNode;
  style?: any;
}) {
  const { children, style } = props;

  return (
    <View
      style={[
        {
          backgroundColor: colors.primary_dark,
          width: "100%",
          height: "100%",
          paddingTop: 80,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
