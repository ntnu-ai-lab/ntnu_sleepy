import React, { useState } from "react";
import { colors } from "../../styles/styles";
import { Card } from "../material/Card";
import { Select } from "../material/Select";
import { TextField } from "../material/TextField";
import { Divider, Text, Title } from "react-native-paper";
import { View } from "react-native";
import { Button } from "../material/Button";
import { Nap } from "../../types/modules";
import SleepDiaryComponentDay from "./SleepDiaryComponentDay";
import SleepDiaryComponentNight from "./SleepDiaryComponentNight";

export default function SleepyDiaryEntryComponent() {
  const [date, setDate] = useState<Date>(new Date());
  const [dayRating, setDayRating] = useState<number>();
  const [sleepAides, setSleepAides] = useState<boolean>(false);
  const [sleepAidesDetails, setSleepAidesDetails] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [sleepQuality, setSleepQuality] = useState<number>();

  const [bedtime, setBedtime] = useState<{
    date?: Date;
    string: string;
    correct: boolean;
  }>({ string: "", correct: true });
  const [lightsOut, setLightsOut] = useState<{
    date?: Date;
    string: string;
    correct: boolean;
  }>({ string: "", correct: true });
  const [waketime, setWaketime] = useState<{
    date?: Date;
    string: string;
    correct: boolean;
  }>({ string: "", correct: true });
  const [risetime, setRisetime] = useState<{
    date?: Date;
    string: string;
    correct: boolean;
  }>({ string: "", correct: true });
  const [timeToSleep, setTimeToSleep] = useState<number>(0);
  const [numberOfNightWakes, setNumberOfNightWakes] = useState<number>();
  const [nightWakes, setNightWakes] = useState<number[]>([]);
  const [hasNapped, setHasNapped] = useState<string>("Nei");
  const [numberOfNaps, setNumberOfNaps] = useState<number>(0);
  const [naps, setNaps] = useState<{
    naps: Nap[];
    startStrings: string[];
    endStrings: string[];
    startCorrects: boolean[];
    endCorrects: boolean[];
  }>({
    naps: [],
    startStrings: [],
    endStrings: [],
    startCorrects: [],
    endCorrects: [],
  });
  const [refreshScreen, setRefreshScreen] = useState<boolean>(false);
  const søvnvurdering = ["Veldig lett", "Lett", "Middels", "Dyp", "Veldig dyp"];
  const dagvurdering = [
    "Veldig dårlig",
    "Dårlig",
    "Middels",
    "Bra",
    "Veldig bra",
  ];

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
