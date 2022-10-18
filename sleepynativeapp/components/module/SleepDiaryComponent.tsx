import React, { useState } from "react";
import { Card } from "../material/Card";
import SleepDiaryComponentDay from "./SleepDiaryComponentDay";
import SleepDiaryComponentNight from "./SleepDiaryComponentNight";

export default function SleepyDiaryEntryComponent() {
  return (
    <Card
      style={{
        alignItems: "center",
        alignSelf: "center",
        width: "70%",
      }}
    >
      <SleepDiaryComponentDay />
      <SleepDiaryComponentNight />
    </Card>
  );
}
