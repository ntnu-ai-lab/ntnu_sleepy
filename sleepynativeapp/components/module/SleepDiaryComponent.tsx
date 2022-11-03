import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { getDiary, listDiaryEntries } from "../../api/sleepDiaryApi";
import { cachedSleepDiary } from "../../state/atoms";
import { Card } from "../material/Card";
import SleepDiaryComponentDay from "./SleepDiaryComponentDay";

export default function SleepyDiaryEntryComponent() {
  const [dayDone, setDayDone] = useState<boolean>(false); //TODO få state fra backend
  const [nightDone, setNightDone] = useState<boolean>(true); //TODO få state fra backend

  return (
    <Card
      style={{
        alignItems: "center",
        alignSelf: "center",
        width: "70%",
      }}
    >
      {dayDone ? <></> : <SleepDiaryComponentDay />}
    </Card>
  );
}
