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
    img: {
      width: 200,
      height: 200,
    },
    caption: {
      color: colors.text_secondary,
      fontSize: 12,
    },
  });

  return (
    <Card>
      {section.heading ? <Text style={styles.heading}>{section.heading}</Text> : <View />}
      <Image style={styles.img} source={{ uri: section.uri }} />
      <Text style={styles.caption}>{section.content}</Text>
    </Card>
  );
}
