import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { colors } from "../../styles/styles";
import { DiaryEntry, Nap, SleepDiary } from "../../types/modules";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { Divider, Text, Title } from "react-native-paper";
import { Select } from "../material/Select";
import { TextField } from "../material/TextField";
import { TimeField } from "../material/TimeField";
import { testDiary } from "../../testing/testdata";
import { getAuthenticatedSession } from "../../auth/Auth";
import {
  finishDiaryEntry,
  getDiary,
  listDiaryEntries,
} from "../../api/sleepDiaryApi";
import { useRecoilState } from "recoil";
import { cachedSleepDiary, cachedSleepDiaryEntry } from "../../state/atoms";

export default function SleepDiaryComponentNight() {
  //const [date, setDate] = useState<Date>(new Date()); // TODO hent date fra frontend
  const [sleepAides, setSleepAides] = useState<boolean>(false);
  const [sleepAidesDetails, setSleepAidesDetails] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [sleepQuality, setSleepQuality] = useState<number>();

  const [bedtime, setBedtime] = useState<Date>();
  const [lightsOut, setLightsOut] = useState<Date>();
  const [waketime, setWaketime] = useState<Date>();
  const [risetime, setRisetime] = useState<Date>();
  const [timeToSleep, setTimeToSleep] = useState<{
    value: number;
    text: string;
  }>({ value: 0, text: "" });
  const [numberOfNightWakes, setNumberOfNightWakes] = useState<{
    value: number;
    text: string;
  }>({ value: 0, text: "" });
  const [nightWakes, setNightWakes] = useState<number[]>([]);
  const [refreshScreen, setRefreshScreen] = useState<boolean>(false);
  const søvnvurdering = ["Veldig lett", "Lett", "Middels", "Dyp", "Veldig dyp"];
  const [sleepDiaryID, setSleepDiaryID] = useState<string>("");
  const [storedSleepDiary, setStoredSleepDiary] =
    useRecoilState(cachedSleepDiary);
  const [diaryEntry, setStoredSleepDiaryEntry] = useRecoilState(
    cachedSleepDiaryEntry
  );

  const [loading, setLoading] = useState<boolean>(false);

  async function checkSleepDiary(): Promise<void> {
    if (storedSleepDiary) {
      console.log("Found sleepdiary from AsyncStorage!");
      setSleepDiaryID(storedSleepDiary.id);
      if (diaryEntry) {
        console.log("Found sleepdiaryEntry from AsyncStorage!");
        //setEntryValues();
      }
    } else {
      console.log(
        "Could not find sleepdiary in AsyncStorage, fetching from db.."
      );
      const diary = await getDiary();
      if (diary !== undefined) {
        setSleepDiaryID(diary.id);
      }
    }
  }

  useEffect(() => {
    checkSleepDiary();
  }, [diaryEntry]);

  function setEntryValues(): void {
    setSleepAides(diaryEntry.sleep_aides);
    setSleepAidesDetails(diaryEntry.sleep_aides_detail);
    setNotes(diaryEntry.notes);
    setSleepQuality(diaryEntry.sleep_quality);
    setBedtime(diaryEntry.bedtime);
    setLightsOut(diaryEntry.lights_out);
    setTimeToSleep((prev) => ({
      ...prev,
      value: diaryEntry.time_to_sleep,
    }));
    setWaketime(diaryEntry.waketime);
    setRisetime(diaryEntry.risetime);
  }

  useEffect(() => {}, [diaryEntry]);

  async function postEntry() {
    console.log("DiaryID: " + sleepDiaryID, storedSleepDiary.id);
    console.log("DiaryEntry: " + diaryEntry?.id);
    console.log(bedtime, lightsOut, timeToSleep, waketime, risetime);
    if (
      diaryEntry &&
      bedtime &&
      lightsOut &&
      timeToSleep &&
      waketime &&
      risetime
    ) {
      console.log("READY TO PATCH");

      const finalEntry: Omit<DiaryEntry, "day_rating" | "naps"> = {
        id: diaryEntry.id,
        date: diaryEntry.date,
        sleep_aides: sleepAides,
        sleep_aides_detail: sleepAidesDetails,
        notes: notes,
        sleep_quality: sleepQuality ?? 0,
        bedtime: bedtime,
        lights_out: lightsOut,
        time_to_sleep: timeToSleep.value,
        night_wakes: nightWakes,
        waketime: waketime,
        risetime: risetime,
      };
      setLoading(true);
      await finishDiaryEntry(sleepDiaryID, finalEntry)
        .then((entry) => {
          if (entry) {
            console.log(entry);
            storedSleepDiary.diary_entries.push(entry);
            setStoredSleepDiary(storedSleepDiary);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  }

  return (
    <Card
      style={{
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 30 }}
      >
        Drakk du alkohol, eller brukte du sovemedisiner for å sove i går?
      </Text>
      <Select
        placeholderText="Drakk du alkohol, eller brukte du sovemedisiner for å sove i går?"
        options={["Ja", "Nei"]}
        optionDisplay={(options: string) => options}
        onChange={(answer) => {
          setSleepAides(answer === "Ja");
        }}
      />
      {sleepAides ? (
        <>
          <Text style={{ color: colors.primary }}>
            Noter medikament og dose, samt eventuelt alkoholinntak
          </Text>
          <TextField
            style={{ minWidth: "100%" }}
            value={sleepAidesDetails}
            onChange={setSleepAidesDetails}
          />
        </>
      ) : (
        <></>
      )}
      <Text
        style={{
          alignItems: "center",
          alignSelf: "center",
          color: colors.primary,
          marginTop: 10,
        }}
      >
        Når gikk du til sengs?
      </Text>
      <TimeField
        onChange={(date) => date && setBedtime(date)}
        baseDate={bedtime}
      />
      <Text
        style={{
          alignItems: "center",
          alignSelf: "center",
          color: colors.primary,
          marginTop: 10,
        }}
      >
        Når skrudde du av lyset?
      </Text>
      <TimeField
        onChange={(date) => date && setLightsOut(date)}
        baseDate={lightsOut}
      />
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Hvor mange minutter tok det fra lyset var skrudd av til du sovnet?
      </Text>
      <TextField
        style={{ minWidth: "30%", alignText: "center", alignItems: "center" }}
        keyboardType="numeric"
        placeholderText="          "
        value={timeToSleep.text}
        onChange={(e) => {
          setTimeToSleep((prev) => ({
            ...prev,
            text: e,
            value: parseInt(e),
          }));
        }}
      />
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Hvor mange ganger våknet du iløpet av natten?
      </Text>
      <TextField
        style={{
          minWidth: "30%",
          alignText: "center",
          alignItems: "center",
        }}
        keyboardType="numeric"
        placeholderText="          "
        value={numberOfNightWakes.text}
        onChange={(e) => {
          setNumberOfNightWakes((prev) => ({
            ...prev,
            text: e,
            value: parseInt(e),
          }));
        }}
      />
      {numberOfNightWakes.value &&
      numberOfNightWakes.value > 0 &&
      numberOfNightWakes.value <= 30 ? (
        <Text
          style={{
            alignItems: "center",
            minWidth: "30%",
            color: colors.primary,
            marginTop: 10,
          }}
        >
          Noter ned antall minutter for hver gang du våknet
        </Text>
      ) : (
        <>{}</>
      )}
      {numberOfNightWakes.value &&
      numberOfNightWakes.value > 0 &&
      numberOfNightWakes.value <= 30 ? (
        [...Array(numberOfNightWakes || 0).keys()].map((n) => (
          <Card style={{ maxWidth: "100%", padding: 5, margin: 0 }}>
            <TextField
              style={{
                minWidth: "30%",
                alignText: "center",
                alignItems: "center",
              }}
              placeholderText="          "
              keyboardType="numeric"
              value={
                nightWakes[n]?.toString() === "NaN"
                  ? ""
                  : nightWakes[n]?.toString()
              }
              onChange={(e) => {
                setNightWakes((wake) => {
                  nightWakes[n] = parseInt(e);
                  setRefreshScreen(!refreshScreen);
                  return wake;
                });
              }}
            />
          </Card>
        ))
      ) : (
        <></>
      )}
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Når våknet du på morgenen uten å få sove igjen? Noter ned ditt endelige
        oppvåkningstidspunkt.
      </Text>
      <TimeField onChange={(date) => date && setWaketime(date)} />
      <Text
        style={{
          alignItems: "center",
          minWidth: "30%",
          color: colors.primary,
          marginTop: 10,
        }}
      >
        Når stod du opp?
      </Text>
      <TimeField onChange={(date) => date && setRisetime(date)} />
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Hvor dyp var søvnen din i natt?
      </Text>
      <Select
        placeholderText="Hvordan var siste natts søvn totalt sett?"
        options={søvnvurdering}
        optionDisplay={(options: string) => options}
        onChange={(e) => {
          setSleepQuality(søvnvurdering.indexOf(e) + 1);
        }}
      />
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Notater
      </Text>
      <TextField
        multiline={true}
        value={notes}
        editable={true}
        onChange={setNotes}
        style={{ marginBottom: 30, minWidth: "100%" }}
      />
      <Button
        style={{ width: "70%", marginBottom: 30 }}
        variant="outlined"
        onClick={() => postEntry()}
      >
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
            padding: 3,
          }}
        >
          {loading ? "Lagrer dagbok..." : "Lagre dagbok"}
        </Text>
      </Button>
    </Card>
  );
}
