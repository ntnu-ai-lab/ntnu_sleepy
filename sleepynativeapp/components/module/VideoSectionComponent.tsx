import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../styles/styles";
import { VideoSection } from "../../types/modules";
import TestVideo from "../TestVideo";
import { Card } from "../material/Card";

export function VideoSectionComponent(props: { section: VideoSection }) {
  const { section } = props;

  const styles = StyleSheet.create({
    card: {
      alignItems: "center",
    },
    heading: {
      color: colors.text_white,
      fontSize: 20,
    },
    video: {
      width: 200,
      height: 200,
      borderRadius: 20,
    },
    caption: {
      color: colors.text_secondary,
      fontSize: 12,
    },
  });

  return (
    <Card style={styles.card}>
      {section.heading ? (
        <Text style={styles.heading}>{section.heading}</Text>
      ) : (
        <View />
      )}
      <TestVideo uri={props.section.uri} />
    </Card>
  );
}