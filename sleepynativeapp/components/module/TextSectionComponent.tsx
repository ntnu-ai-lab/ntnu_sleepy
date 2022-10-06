import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/styles";
import { TextSection } from "../../types/modules";
import { Card } from "../material/Card";

export function TextSectionComponent(props: { section: TextSection }) {
  const { section } = props;

  const styles = StyleSheet.create({
    content: {
      color: colors.text_white,
      fontSize: 14,
    },
    heading: {
      color: colors.text_white,
      fontSize: 20,
    },
  });

  return (
    <Card>
      {section.heading ? (
        <Text style={styles.heading}>{section.heading}</Text>
      ) : (
        <View />
      )}
      <Text style={styles.content}>{section.content}</Text>
    </Card>
  );
}
