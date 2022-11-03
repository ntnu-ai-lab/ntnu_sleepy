import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../styles/styles";
import {
  FormSelectOption,
  Input,
  Question,
  QuizOption,
  QuizSection,
} from "../../../types/modules";
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
      {section.questions.map((q: Question) => (
        <QuizQuestionComponent question={q} />
      ))}
    </Card>
  );
}

export function QuizQuestionComponent(props: { question: Question }) {
  const { question } = props;
  const [selected, setSelected] = useState<QuizOption>();

  return (
    <View style={{ paddingVertical: 5 }}>
      <Text style={styles.subHeading}>{question.question}</Text>
      <Select
        options={question.options ? question.options : []}
        optionDisplay={(option: QuizOption) => option.label}
        value={selected}
        onChange={setSelected}
      />
      {
        selected ? <Text style={{color: selected.correct ? "#00FF00" : "#FF0000", fontSize: 18}}>{selected.correct ? "Riktig :)" : "Feil :("}</Text> : <View />
      }
    </View>
  );
}
