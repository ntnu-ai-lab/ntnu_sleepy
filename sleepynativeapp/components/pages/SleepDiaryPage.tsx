import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { colors } from "../../styles/styles";
import { Card } from "../material/Card";
import { PageTemplate } from "../material/PageTemplate";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DiaryEntry, SleepDiary } from "../../types/modules";
import { Button } from "../material/Button";
import SleepyDiaryEntryComponent from "../pages/SleepyDiaryEntryComponent";
import {
  createDiary,
  getDiary,
  listDiaryEntries,
} from "../../api/sleepDiaryApi";
import { useRecoilState } from "recoil";
import { cachedSleepDiary } from "../../state/atoms";
import SleepDiaryComponentDay from "./SleepDiaryComponentDay";
import { AuthContext } from "../../auth/AuthProvider";

export function SleepDiaryPage() {
  //States to show and hide the different components.
  const [createNewDiary, setCreateNewDiary] = useState<boolean>(false);
  const [showAllDiaries, setShowAllDiaries] = useState<boolean>(false);
  const [storedSleepDiary, setStoredSleepDiary] =
    useRecoilState(cachedSleepDiary);
  const [sleepDiary, setSleepDiary] = useState<SleepDiary>();
  const [refreshScreen, setRefreshScreen] = useState<boolean>(false);
  const { isAuthenticated } = useContext(AuthContext);

  const hasSleepDiary = !!sleepDiary;
  /**
   * Checks if there exists a sleepDiary in asyncstorage, else it fetches the sleepDiary from the backend.
   */
  async function checkSleepDiary(): Promise<SleepDiary | undefined> {
    if (!isAuthenticated) return;
    if (!storedSleepDiary) {
      const diary = await getDiary();
      if (diary === undefined) {
        //console.log("No sleepdiary found..");
        return undefined;
      } else {
        //console.log("Sleepdiary found!");
        const diaryEntries = await listDiaryEntries(diary.id);
        const tempDiary: SleepDiary = {
          id: diary.id,
          user: diary.user,
          started_date: diary.started_date,
          diary_entries: diaryEntries ?? [],
        };
        setSleepDiary(tempDiary);
        setStoredSleepDiary(tempDiary);
      }
    }
  }

  /**
   * If there does not exist a sleepDiary associated with the user in the backend,
   * the user will be prompted a button to create a new one.
   */
  async function createSleepDiary(): Promise<SleepDiary | undefined> {
    const result = await createDiary();
    if (result) {
      const diaryEntries = await listDiaryEntries(result.id);
      const sleepDiary: SleepDiary = {
        id: result.id,
        user: result.user,
        started_date: result.started_date,
        diary_entries: diaryEntries ?? [],
      };
      setStoredSleepDiary(sleepDiary);
      return sleepDiary;
    }
  }

  useEffect(() => {
    checkSleepDiary();
  }, [storedSleepDiary]);

  useEffect(() => {
    setRefreshScreen(!refreshScreen);
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
                setCreateNewDiary(false);
              }}
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
              onClick={() => {
                setCreateNewDiary(!createNewDiary);
                setShowAllDiaries(false);
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
        {showAllDiaries && storedSleepDiary && !createNewDiary ? (
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
        {createNewDiary && !showAllDiaries ? <SleepDiaryComponentDay /> : <></>}
        {storedSleepDiary !== undefined ? (
          <></>
        ) : (
          <Card
            style={{ alignItems: "center", alignSelf: "center", width: "70%" }}
          >
            <Button
              style={{ width: "50%" }}
              onClick={() => {
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
