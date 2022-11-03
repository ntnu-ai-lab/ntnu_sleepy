import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Divider, Text, Title } from "react-native-paper";
import { colors } from "../../styles/styles";
import { Card } from "../material/Card";
import { TextField } from "../material/TextField";
import { PageTemplate } from "../material/PageTemplate";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Select } from "../material/Select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DiaryEntry, SleepDiary } from "../../types/modules";
import { testDiary } from "../../testing/testdata";
import { Button } from "../material/Button";
import SleepyDiaryEntryComponent from "../module/SleepyDiaryEntryComponent";
import SleepDiaryComponent from "../module/SleepDiaryComponent";
import {
  createDiary,
  getDiary,
  listDiaryEntries,
} from "../../api/sleepDiaryApi";
import { useRecoilState } from "recoil";
import { cachedSleepDiary } from "../../state/atoms";
import SleepDiaryComponentDay from "../module/SleepDiaryComponentDay";

export function SleepDiaryPage() {
  const [createNewDiary, setCreateNewDiary] = useState<boolean>(false);
  const [showAllDiaries, setShowAllDiaries] = useState<boolean>(false);
  const [storedSleepDiary, setStoredSleepDiary] =
    useRecoilState(cachedSleepDiary);
  const [sleepDiary, setSleepDiary] = useState<SleepDiary>();
  const [hasSleepDiary, setHasSleepDiary] = useState<boolean>(); //TODO fetch hasSleepDiary from backend
  const [refreshScreen, setRefreshScreen] = useState<boolean>(false);

  async function checkSleepDiary(): Promise<SleepDiary | undefined> {
    if (storedSleepDiary) {
      console.log(
        "STORED DIARY IN ASYNCSTORAGE: " + storedSleepDiary.diary_entries
      );
      setHasSleepDiary(true);
    } else {
      const diary = await getDiary();
      if (diary === undefined) {
        console.log("No sleepdiary found..");
        return undefined;
      } else {
        console.log("Sleepdiary found!");
        const diaryEntries = await listDiaryEntries(diary.id);
        //console.log(diaryEntries);
        const tempDiary: SleepDiary = {
          id: diary.id,
          user: diary.user,
          started_date: diary.started_date,
          diary_entries: diaryEntries ?? [],
        };
        setSleepDiary(tempDiary);
        setStoredSleepDiary(tempDiary);
        //console.log("STORED DIARY: " + storedSleepDiary);
        setHasSleepDiary(true);
      }
    }
  }

  async function createSleepDiary(): Promise<SleepDiary | undefined> {
    const result = await createDiary();
    if (result) {
      const diaryEntries = await listDiaryEntries(result.id);
      console.log(result);
      //console.log(diaryEntries);
      const sleepDiary: SleepDiary = {
        id: result.id,
        user: result.user,
        started_date: result.started_date,
        diary_entries: diaryEntries ?? [],
      };
      setStoredSleepDiary(sleepDiary);
      //console.log(storedSleepDiary);
      //setSleepDiary(sleepDiary);
      //setHasSleepDiary(true);
      return sleepDiary;
    }
  }

  useEffect(() => {
    checkSleepDiary();
  }, [storedSleepDiary]);

  useEffect(() => {
    setRefreshScreen(!refreshScreen);
    console.log("Refreshed screen");
  }, [storedSleepDiary]);

  return (
    <PageTemplate>
      <KeyboardAwareScrollView>
        {hasSleepDiary ? (
          <Card
            style={{ alignItems: "center", alignSelf: "center", width: "70%" }}
          >
            <Button
              style={{ width: "50%" }}
              onClick={() => {
                setShowAllDiaries(!showAllDiaries);
                if (createNewDiary) {
                  setCreateNewDiary(false);
                }
              }}
              variant="outlined"
            >
              <Text
                style={{
                  color: colors.primary,
                  textAlign: "center",
                }}
              >
                Vis/endre eksisterende dager
              </Text>
            </Button>
            <Button
              style={{ width: "50%" }}
              onClick={() => {
                setCreateNewDiary(!createNewDiary);
                if (showAllDiaries) {
                  setShowAllDiaries(false);
                }
              }}
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
        {showAllDiaries && storedSleepDiary ? (
          storedSleepDiary.diary_entries.map((e: DiaryEntry, i) => (
            <SleepyDiaryEntryComponent
              sleepDiaryEntry={e}
              sleepDiaryID={storedSleepDiary.id}
              index={i}
              key={i}
            />
          ))
        ) : (
          <></>
        )}
        {createNewDiary ? <SleepDiaryComponentDay /> : <></>}
        {storedSleepDiary !== undefined ? (
          <></>
        ) : (
          <Card
            style={{ alignItems: "center", alignSelf: "center", width: "70%" }}
          >
            <Button
              style={{ width: "50%" }}
              onClick={() => {
                //setHasSleepDiary(true);
                createSleepDiary();
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
