import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../styles/styles";
import { FormSelectOption, Input, QuizSection } from "../../../types/modules";
import { Card } from "../../material/Card";
import { Select } from "../../material/Select";

const styles = StyleSheet.create({
  caption: {
    color: colors.text_secondary,
    fontSize: 12,
  },
  heading: {
    color: colors.text_white,
    fontSize: 20,
  },
  subHeading: {
    color: colors.text_white,
    fontSize: 16,
  },
  card: {
    alignItems: "center",
  },
});

export function QuizSectionComponent(props: { section: QuizSection }) {
  const { section } = props;

  return (
    <Card>
      <Text style={[styles.heading, { alignSelf: "center" }]}>
        {section.heading}
      </Text>
      {section.questions.map((q: Input) => (
        <View style={{ paddingVertical: 5 }}>
          <Text style={styles.subHeading}>{q.label}</Text>
          <Select
            options={q.options ? q.options : []}
            optionDisplay={(option: FormSelectOption) => option.lable}
            placeholderText={q.label}
          />
          <Text style={styles.caption}>{q.helptext}</Text>
        </View>
      ))}
    </Card>
  );
}
