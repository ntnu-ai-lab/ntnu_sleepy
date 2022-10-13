import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
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
import SleepyDiaryEntryComponent from "./module/SleepyDiaryEntryComponent";

export function SleepDiaryPage() {
  const navigation = useNavigation();

  const [createNewDiary, setCreateNewDiary] = useState<boolean>(false);
  const [showAllDiaries, setShowAllDiaries] = useState<boolean>(false);
  const [sovemedisiner, setSovemedisiner] = useState<boolean>(false);
  const [newDiary, setNewDiary] = useState<string>("");
  const [medikament, setMedikament] = useState<string>("");

  const sleepDiary: SleepDiary = testDiary;

  const søvnvurdering = ["Veldig dyp", "Dyp", "Middels", "Lett", "Veldig dyp"];
  const dagvurdering = [
    "Veldig bra",
    "Bra",
    "Middels",
    "Dårlig",
    "Veldig dårlig",
  ];

  return (
    <PageTemplate>
      <KeyboardAwareScrollView>
        <Card
          style={{ alignItems: "center", alignSelf: "center", width: "70%" }}
        >
          <Button
            style={{ backgroundColor: colors.primary, width: "50%" }}
            onClick={() => setShowAllDiaries(!showAllDiaries)}
          >
            <Text>Vis alle søvndagbøker</Text>
          </Button>
          <Button
            style={{ backgroundColor: colors.primary, width: "50%" }}
            onClick={() => setCreateNewDiary(!createNewDiary)}
          >
            <Text>Logg en ny dag</Text>
          </Button>
        </Card>
        {showAllDiaries ? (
          sleepDiary.diary_entries.map((e: DiaryEntry, i) => (
            <SleepyDiaryEntryComponent sleepDiaryEntry={e} index={i} />
          ))
        ) : (
          <></>
        )}
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
              options={søvnvurdering}
              optionDisplay={(options: string) => options}
            />
            {
              <Select
                placeholderText="Hvordan har du fungert på dagtid?"
                options={dagvurdering}
                optionDisplay={(options: string) => options}
              />
            }
            {
              <Select
                placeholderText="Drakk du alkohol, eller brukte du sovemedisiner for å sove i går?"
                options={["Ja", "Nei"]}
                optionDisplay={(options: string) => options}
                onChange={(answer) => {
                  setSovemedisiner(answer === "Ja");
                }}
              />
            }
            {sovemedisiner ? (
              <>
                <Text style={{ color: colors.primary }}>
                  Noter medikament og dose, samt eventuelt alkoholinntak
                </Text>
                <TextField
                  style={{ width: "85%" }}
                  value={medikament}
                  onChange={setMedikament}
                />
              </>
            ) : (
              <></>
            )}
          </Card>
        ) : (
          <></>
        )}
      </KeyboardAwareScrollView>
    </PageTemplate>
  );
}
