import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { getDiary, listDiaryEntries } from "../../api/sleepDiaryApi";
import { cachedSleepDiary } from "../../state/atoms";
import { Card } from "../material/Card";
import SleepDiaryComponentDay from "./SleepDiaryComponentDay";
import SleepDiaryComponentNight from "./SleepDiaryComponentNight";

export default function SleepyDiaryEntryComponent() {
  const [dayDone, setDayDone] = useState<boolean>(false); //TODO få state fra backend
  const [nightDone, setNightDone] = useState<boolean>(true); //TODO få state fra backend

  /* async function checkSleepDiary(): Promise<void> {
    {
      const diary = await getDiary();
      //console.log(diary);
      if (diary !== undefined) {
        const diaryEntries = listDiaryEntries(diary.id);
      }
    }
  }

  const [storedSleepDiary, setStoredSleepDiary] =
    useRecoilState(cachedSleepDiary);

  console.log("STORED" + storedSleepDiary); */

  return (
    <Card
      style={{
        alignItems: "center",
        alignSelf: "center",
        width: "70%",
      }}
    >
      {dayDone ? <></> : <SleepDiaryComponentDay />}
      {nightDone ? <></> : <SleepDiaryComponentNight />}
    </Card>
  );
}
