import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { sendAnswerList } from "../../../api/formApi";
import { AuthContext } from "../../../auth/AuthProvider";
import { loggedInUser } from "../../../state/atoms";
import { colors } from "../../../styles/styles";
import {
  Answer,
  AnswerList,
  FormSection,
  FormSelectOption,
  Input,
} from "../../../types/modules";
import { Button } from "../../material/Button";
import { Card } from "../../material/Card";
import { Select } from "../../material/Select";
import { TextField } from "../../material/TextField";

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

export function FormSectionComponent(props: { section: FormSection }) {
  const { section } = props;
  const user = useRecoilValue(loggedInUser);
  const { session } = useContext(AuthContext);
  const id = session?.identity?.id ? session.identity.id : "";

  const [answers, setAnswers] = useState<AnswerList>({
    section: section.id,
    user: id,
    answers: [],
  });

  function submitAnswer(answer: Answer) {
    const tempAnswers = answers;
    tempAnswers.answers.push(answer);
    setAnswers(tempAnswers);
  }

  /*
  useEffect(() => {
    console.log(answers)
  },[answers])
*/
  return (
    <Card>
      <Text style={[styles.heading, { alignSelf: "center" }]}>
        {section.heading}
      </Text>
      {section.form.map((input: Input, i) => {
        switch (input.type) {
          case "text": {
            return (
              <View key={i}>
                <TextFormInput input={input} submitAnswer={submitAnswer} />
              </View>
            );
          }
          case "select": {
            return (
              <View key={i}>
                <SelectFormInput input={input} submitAnswer={submitAnswer} />
              </View>
            );
          }
          case "checkbox": {
            return (
              <View key={i}>
                <CheckboxFormInput input={input} submitAnswer={submitAnswer} />
              </View>
            );
          }
          default: {
            return <View key={i} />;
          }
        }
      })}
      <Button
        onClick={() => {
          sendAnswerList(answers);
        }}
        variant={"contained"}
      >
        <Text>Send in</Text>
      </Button>
    </Card>
  );
}

function TextFormInput(props: {
  input: Input;
  submitAnswer: (arg: Answer) => void;
}) {
  const { input, submitAnswer } = props;
  const [newAnswer, setNewAnswer] = useState<string>("");

  useEffect(() => {
    const answer: Answer = {
      input: input.id,
      value: newAnswer,
    };
    submitAnswer(answer);
  }, [newAnswer]);

  return (
    <View style={{ paddingVertical: 5 }}>
      <Text style={styles.subHeading}>{input.label}</Text>
      <TextField
        value={newAnswer}
        onChange={setNewAnswer}
        placeholderText={input.value}
        multiline
      />
      <Text style={styles.caption}>{input.helptext}</Text>
    </View>
  );
}

function SelectFormInput(props: {
  input: Input;
  submitAnswer: (arg: Answer) => void;
}) {
  const { input, submitAnswer } = props;
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const answer: Answer = {
      input: input.id,
      value: selected,
    };
    submitAnswer(answer);
  }, [selected]);

  return (
    <View style={{ paddingVertical: 5 }}>
      <Text style={styles.subHeading}>{input.label}</Text>
      <Select
        options={input.options ? input.options : []}
        optionDisplay={(option: FormSelectOption) => option.lable}
        placeholderText={input.label}
      />
      <Text style={styles.caption}>{input.helptext}</Text>
    </View>
  );
}

function CheckboxFormInput(props: {
  input: Input;
  submitAnswer: (arg: Answer) => void;
}) {
  const { input, submitAnswer } = props;
  const [checked, setChecked] = useState<
    "checked" | "unchecked" | "indeterminate"
  >("unchecked");

  useEffect(() => {
    const answer: Answer = {
      input: input.id,
      value: checked,
    };
    submitAnswer(answer);
  }, [checked]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
      }}
    >
      <Text style={styles.subHeading}>{input.label}</Text>
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 10,
          width: 38,
          marginRight: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Checkbox
          status={checked}
          onPress={() => {
            if (checked === "checked") setChecked("unchecked");
            else setChecked("checked");
          }}
        />
      </View>
    </View>
  );
}
