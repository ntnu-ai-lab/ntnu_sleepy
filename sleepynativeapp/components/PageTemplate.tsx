import React, { ReactNode } from "react";
import { Dimensions, ScrollView } from "react-native";
import { colors } from "../styles/styles";

export function PageTemplate(props: {
  children: ReactNode[] | ReactNode;
  style?: any;
}) {
  const { children, style } = props;

  return (
    <ScrollView
      style={[
        {
          backgroundColor: colors.primary_dark,
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          paddingTop: 80,
        },
        style,
      ]}
    >
      {children}
    </ScrollView>
  );
}
