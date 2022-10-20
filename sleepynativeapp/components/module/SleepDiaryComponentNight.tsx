import React, { useState } from "react";
import { View } from "react-native";
import { colors } from "../../styles/styles";
import { Nap, SleepDiary } from "../../types/modules";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { Divider, Text, Title } from "react-native-paper";
import { Select } from "../material/Select";
import { TextField } from "../material/TextField";
import { DateField } from "../material/DateField";
import { testDiary } from "../../testing/testdata";
import { getAuthenticatedSession } from "../../auth/Auth";

export default function SleepDiaryComponentNight() {
  const [date, setDate] = useState<Date>(new Date());
  const [sleepAides, setSleepAides] = useState<boolean>(false);
  const [sleepAidesDetails, setSleepAidesDetails] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [sleepQuality, setSleepQuality] = useState<number>();

  const [bedtime, setBedtime] = useState<Date>();
  const [lightsOut, setLightsOut] = useState<Date>();
  const [waketime, setWaketime] = useState<Date>();
  const [risetime, setRisetime] = useState<Date>();
  const [timeToSleep, setTimeToSleep] = useState<number>(0);
  const [numberOfNightWakes, setNumberOfNightWakes] = useState<number>();
  const [nightWakes, setNightWakes] = useState<number[]>([]);
  const [refreshScreen, setRefreshScreen] = useState<boolean>(false);
  const søvnvurdering = ["Veldig lett", "Lett", "Middels", "Dyp", "Veldig dyp"];

  function saveDiary(): void {
    const testSleepDiary = testDiary;
    //sendSleepDiary(testSleepDiary);
    const promise = getAuthenticatedSession();
    promise.then((val) => console.log(val));
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
            style={{ width: "100%" }}
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

      <DateField onChange={setBedtime} />
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
      <DateField onChange={setLightsOut} />

      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Hvor mange minutter tok det fra lyset var skrudd av til du sovnet?
      </Text>
      <TextField
        style={{ minWidth: "10%" }}
        keyboardType="numeric"
        value={timeToSleep ? timeToSleep.toString() : ""}
        onChange={(e) => setTimeToSleep(parseInt(e))}
      />

      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Hvor mange ganger våknet du iløpet av natten?
      </Text>
      <TextField
        style={{ maxWidth: "20%", alignText: "center", alignItems: "center" }}
        keyboardType="numeric"
        placeholderText="          "
        value={numberOfNightWakes ? numberOfNightWakes.toString() : ""}
        onChange={(e) => setNumberOfNightWakes(parseInt(e))}
      />
      {numberOfNightWakes &&
      numberOfNightWakes > 0 &&
      numberOfNightWakes <= 30 ? (
        <Text
          style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
        >
          Noter ned antall minutter for hver gang du våknet
        </Text>
      ) : (
        <>{}</>
      )}
      {numberOfNightWakes &&
      numberOfNightWakes > 0 &&
      numberOfNightWakes <= 30 ? (
        [...Array(numberOfNightWakes || 0).keys()].map((n) => (
          <Card style={{ maxWidth: "100%", padding: 5, margin: 0 }}>
            <TextField
              style={{
                minWidth: "20%",
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

      <DateField onChange={setWaketime} />
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Når stod du opp?
      </Text>

      <DateField onChange={setRisetime} />
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
        onClick={() => saveDiary()}
      >
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
          }}
        >
          Lagre dagbok
        </Text>
      </Button>
    </Card>
  );
}
