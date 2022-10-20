import React, { useState } from "react";
import { Card } from "../material/Card";
import SleepDiaryComponentDay from "./SleepDiaryComponentDay";
import SleepDiaryComponentNight from "./SleepDiaryComponentNight";

export default function SleepyDiaryEntryComponent() {
  const [dayDone, setDayDone] = useState<boolean>(true); //TODO få state fra backend
  const [nightDone, setNightDone] = useState<boolean>(false); //TODO få state fra backend

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
