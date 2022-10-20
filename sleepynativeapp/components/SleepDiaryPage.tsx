import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Divider, Text, Title } from "react-native-paper";
import { colors } from "../styles/styles";
import { Card } from "./material/Card";
import { TextField } from "./material/TextField";
import { PageTemplate } from "./material/PageTemplate";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Select } from "./material/Select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DiaryEntry, SleepDiary } from "../types/modules";
import { testDiary } from "../testing/testdata";
import { Button } from "./material/Button";
import SleepyDiaryEntryComponent from "./module/SleepyDiaryEntryComponent";
import SleepDiaryComponent from "./module/SleepDiaryComponent";
import { createDiary, getDiary, listDiaryEntries } from "../api/sleepDiaryApi";
import { storeSleepDiary } from "../state/StorageController";
import { useRecoilState } from "recoil";
import { cachedSleepDiary } from "../state/atoms";

export function SleepDiaryPage() {
  const [createNewDiary, setCreateNewDiary] = useState<boolean>(false);
  const [showAllDiaries, setShowAllDiaries] = useState<boolean>(false);

  const sleepDiary: SleepDiary = testDiary;

  const søvnvurdering = ["Veldig dyp", "Dyp", "Middels", "Lett", "Veldig dyp"];
  const dagvurdering = [
    "Veldig bra",
    "Bra",
    "Middels",
    "Dårlig",
    "Veldig dårlig",
  ];

  async function checkSleepDiary(): Promise<void> {
    {
      const diary = await getDiary();
      console.log(diary);
      if (diary === undefined) {
        console.log("Found no diary, creating a new diary");
        const result = await createDiary();
        if (result) {
          const diaryEntries = await listDiaryEntries(result.id);
          console.log(result);
          console.log(diaryEntries);
          const sleepDiary: SleepDiary = {
            id: result.id,
            user: result.user,
            started_date: result.started_date,
            diary_entries: diaryEntries ?? [],
          };
          storeSleepDiary(sleepDiary);
          setHasSleepDiary(true);
        }
      } else {
        setHasSleepDiary(true);
      }
    }
  }

  const [storedSleepDiary, setSleepDiary] = useRecoilState(cachedSleepDiary);

  const [hasSleepDiary, setHasSleepDiary] = useState<boolean>(); //TODO fetch hasSleepDiary from backend

  return (
    <PageTemplate>
      <KeyboardAwareScrollView>
        {hasSleepDiary ? (
          <Card
            style={{ alignItems: "center", alignSelf: "center", width: "70%" }}
          >
            <Button
              style={{ width: "50%" }}
              onClick={() => setShowAllDiaries(!showAllDiaries)}
              variant="outlined"
            >
              <Text
                style={{
                  color: colors.primary,
                  textAlign: "center",
                }}
              >
                Vis alle søvndagbøker
              </Text>
            </Button>
            <Button
              style={{ width: "50%" }}
              onClick={() => setCreateNewDiary(!createNewDiary)}
              variant="outlined"
            >
              <Text
                style={{
                  color: colors.primary,
                  textAlign: "center",
                }}
              >
                Logg en ny dag
              </Text>
            </Button>
          </Card>
        ) : (
          <></>
        )}
        {showAllDiaries ? (
          sleepDiary.diary_entries.map((e: DiaryEntry, i) => (
            <SleepyDiaryEntryComponent sleepDiaryEntry={e} index={i} />
          ))
        ) : (
          <></>
        )}
        {createNewDiary ? <SleepDiaryComponent /> : <></>}
        {hasSleepDiary ? (
          <></>
        ) : (
          <Card
            style={{ alignItems: "center", alignSelf: "center", width: "70%" }}
          >
            <Button
              style={{ width: "50%" }}
              onClick={() => {
                setHasSleepDiary(true);
                checkSleepDiary();
              }}
              variant="outlined"
            >
              <Text
                style={{
                  color: colors.primary,
                  textAlign: "center",
                }}
              >
                Start din søvndagbok
              </Text>
            </Button>
          </Card>
        )}
      </KeyboardAwareScrollView>
    </PageTemplate>
  );
}
