import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image } from "react-native";
import { Divider, Text, Title } from "react-native-paper";
import { colors } from "../styles/styles";
import { Card } from "./material/Card";
import { TextField } from "./material/TextField";
import { PageTemplate } from "./PageTemplate";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Select } from "./material/Select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DiaryAnswer, DiaryEntry, SleepDiary } from "../types/modules";
import { testDiary } from "../helpers/testdata";
import { Button } from "./material/Button";

export function SleepDiaryPage() {
  const navigation = useNavigation();

  const [createNewDiary, setCreateNewDiary] = useState<boolean>(false);
  const [newDiary, setNewDiary] = useState<string>("");

  const sleepDiary: SleepDiary = testDiary;
  const søvnvurdering = [
    "Dårlig",
    "Ganske dårlig",
    "Middels",
    "Ganske bra",
    "Bra",
  ];

  return (
    <PageTemplate>
      <KeyboardAwareScrollView>
        {sleepDiary.diary_entries.map((e: DiaryEntry, i) => {
          return (
            <View key={i}>
              <Card
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  width: "70%",
                }}
              >
                <Title style={{ color: colors.primary }}>
                  {e.risetime.toLocaleDateString()}
                </Title>
                <TextField
                  style={{ maxWidth: "90%" }}
                  value={e.notes}
                  editable={false}
                  multiline={true}
                />
                <TextField
                  style={{ maxWidth: "40%", alignItems: "center" }}
                  value={søvnvurdering[e.rating - 1]}
                  editable={false}
                />
                {e.answers.map((a: DiaryAnswer, i) => {
                  return (
                    <View key={i}>
                      <Card
                        style={{
                          alignItems: "center",
                          alignSelf: "center",
                          width: 600,
                        }}
                      >
                        <Title
                          style={{
                            alignItems: "center",
                            color: colors.primary,
                          }}
                        >
                          {a.question}
                        </Title>
                        <TextField
                          style={{ alignItems: "center", maxWidth: "90%" }}
                          value={a.answer}
                          editable={false}
                        />
                      </Card>
                    </View>
                  );
                })}
              </Card>
            </View>
          );
        })}
        {createNewDiary ? (
          <Card
            style={{
              alignItems: "center",
              alignSelf: "center",
              width: "70%",
            }}
          >
            <TextField
              placeholderText="Notater: "
              multiline={true}
              value={newDiary}
              editable={true}
              onChange={setNewDiary}
            />
            <Select
              placeholderText="Hvor dyp var søvnen din i natt?"
              options={["Veldig dyp", "Dyp", "Middels", "Lett", "Veldig dyp"]}
              optionDisplay={(options: string) => options}
            />
          </Card>
        ) : (
          <></>
        )}
        <Card
          style={{ alignItems: "center", alignSelf: "center", width: "70%" }}
        >
          <Button
            style={{ backgroundColor: colors.primary, width: "50%" }}
            onClick={() => setCreateNewDiary(!createNewDiary)}
          >
            <Text>Logg en ny dag</Text>
          </Button>
        </Card>
      </KeyboardAwareScrollView>
    </PageTemplate>
  );
}
