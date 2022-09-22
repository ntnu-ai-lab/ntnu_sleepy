import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { colors } from "../../styles/styles";
import { ImageSection } from "../../types/modules";
import { Card } from "../material/Card";

export function ImageSectionComponent(props: { section: ImageSection }) {
  const { section } = props;

  const styles = StyleSheet.create({
    heading: {
      color: colors.text_white,
      fontSize: 20,
    },
    img: {},
    caption: {
      color: colors.text_secondary,
      fontSize: 12,
    },
  });

  return (
    <Card>
      <Text style={styles.heading}></Text>
      <Image style={styles.img} source={{ uri: section.uri }} />
      <Text style={styles.caption}></Text>
    </Card>
  );
}
