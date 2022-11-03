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
    answers: section.form.map((i) => {
      const answer: Answer = {
        input: i.id,
        value: "",
      };
      return answer;
    }),
  });

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
                <TextFormInput
                  input={input}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              </View>
            );
          }
          case "select": {
            return (
              <View key={i}>
                <SelectFormInput
                  input={input}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              </View>
            );
          }
          case "checkbox": {
            return (
              <View key={i}>
                <CheckboxFormInput
                  input={input}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              </View>
            );
          }
          default: {
            return <View key={i} />;
          }
        }
      })}
      <Button
        onClick={async () => {
          sendAnswerList(answers);
        }}
        variant={"contained"}
      >
        <Text>Send inn</Text>
      </Button>
    </Card>
  );
}

function TextFormInput(props: {
  input: Input;
  answers: AnswerList;
  setAnswers: (arg0: AnswerList) => void;
}) {
  const { input, answers, setAnswers } = props;
  const answered = input.answers?.length ?? 0 > 0;
  const [newAnswer, setNewAnswer] = useState<string>(
    input.answers?.[0] ? (input.answers?.[0].value as string) : ""
  );

  useEffect(() => {
    const newAnswers = [...answers.answers];
    newAnswers.forEach((a, n) => {
      if (a.input === input.id) {
        const answer: Answer = {
          ...a,
          value: newAnswer,
        };
        newAnswers.splice(n, 1, answer);
      }
    });
    const newAnswerList = {
      ...answers,
      answers: newAnswers,
    };
    setAnswers(newAnswerList);
  }, [newAnswer]);

  return (
    <View style={{ paddingVertical: 5 }}>
      <Text style={styles.subHeading}>{input.label}</Text>
      <TextField
        value={newAnswer}
        onChange={setNewAnswer}
        placeholderText={input.value}
        multiline
        editable={!answered}
      />
      <Text style={styles.caption}>{input.helptext}</Text>
    </View>
  );
}

function SelectFormInput(props: {
  input: Input;
  answers: AnswerList;
  setAnswers: (arg0: AnswerList) => void;
}) {
  const { input, answers, setAnswers } = props;

  function getPrevAnswer() {
    let prev: FormSelectOption
    try {
      prev = { 
        value: input.answers?.[0]?.value as string, 
        label: input.options?.find(option => option.value === input.answers?.[0].value)?.label as string
      }
    }
    catch {
      prev = {
        value: "", label: "" 
      }
    }
    return prev
  }

  const [selected, setSelected] = useState<FormSelectOption>(getPrevAnswer());

  useEffect(() => {
    if (selected) {
      const newAnswers = [...answers.answers];
      newAnswers.forEach((a, n) => {
        if (a.input === input.id) {
          const answer: Answer = {
            ...a,
            value: selected.value,
          };
          newAnswers.splice(n, 1, answer);
        }
      });
      const newAnswerList = {
        ...answers,
        answers: newAnswers,
      };
      setAnswers(newAnswerList);
    }
  }, [selected]);

  return (
    <View style={{ paddingVertical: 5 }}>
      <Text style={styles.subHeading}>{input.label}</Text>
      <Select
        options={input.options ? input.options : []}
        optionDisplay={(option: FormSelectOption) => option.label}
        onChange={setSelected}
        placeholderText={input.label}
        value={selected}
      />
      <Text style={styles.caption}>{input.helptext}</Text>
    </View>
  );
}

function CheckboxFormInput(props: {
  input: Input;
  answers: AnswerList;
  setAnswers: (arg0: AnswerList) => void;
}) {
  const { input, answers, setAnswers } = props;
  const [checked, setChecked] = useState<
    "checked" | "unchecked" | "indeterminate"
  >(input.answers?.[0].value ? "checked" : "unchecked");

  useEffect(() => {
    const newAnswers = [...answers.answers];
    newAnswers.forEach((a, n) => {
      if (a.input === input.id) {
        const answer: Answer = {
          ...a,
          value: checked === "checked" ? true : false,
        };
        newAnswers.splice(n, 1, answer);
      }
    });
    const newAnswerList = {
      ...answers,
      answers: newAnswers,
    };
    setAnswers(newAnswerList);
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
