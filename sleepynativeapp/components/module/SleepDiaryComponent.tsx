import React, { useState } from "react";
import { colors } from "../../styles/styles";
import { Card } from "../material/Card";
import { Select } from "../material/Select";
import { TextField } from "../material/TextField";
import { Divider, Text, Title } from "react-native-paper";
import { View } from "react-native";
import { Button } from "../material/Button";
import { Nap } from "../../types/modules";

export default function SleepyDiaryEntryComponent() {
  const [date, setDate] = useState<Date>(new Date());
  const [dayRating, setDayRating] = useState<number>();
  const [naps, setNaps] = useState<Nap[]>([]);
  const [napStrings1, setNapStrings1] = useState<string[]>([]);
  const [napStrings2, setNapStrings2] = useState<string[]>([]);
  const [sleepAides, setSleepAides] = useState<boolean>(false);
  const [sleepAidesDetails, setSleepAidesDetails] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [sleepQuality, setSleepQuality] = useState<number>();
  const [bedtime, setBedtime] = useState<Date>();
  const [lightsOut, setLightsOut] = useState<Date>();
  const [timeToSleep, setTimeToSleep] = useState<number>();
  const nightWakes: number[] = [];
  const [waketime, setwaketime] = useState<Date>();
  const [risetime, setRisetime] = useState<Date>();
  const [hasNapped, setHasNapped] = useState<string>("Nei");
  const [numberOfNaps, setNumberOfNaps] = useState<number>(0);
  const [napStringCorrect1, setNapStringCorrect1] = useState<boolean[]>([]);
  const [napStringCorrect2, setNapStringCorrect2] = useState<boolean[]>([]);
  const [refreshScreen, setRefreshScreen] = useState<boolean>(false);

  const søvnvurdering = ["Veldig dyp", "Dyp", "Middels", "Lett", "Veldig dyp"];
  const dagvurdering = [
    "Veldig bra",
    "Bra",
    "Middels",
    "Dårlig",
    "Veldig dårlig",
  ];

  return (
    <Card
      style={{
        alignItems: "center",
        alignSelf: "center",
        width: "70%",
      }}
    >
      <TextField
        placeholderText="Notater: "
        multiline={true}
        value={notes}
        editable={true}
        onChange={setNotes}
      />
      {
        <Select
          placeholderText="Hvordan har du fungert på dagtid?"
          options={dagvurdering}
          optionDisplay={(options: string) => options}
        />
      }
      {
        <Select
          placeholderText="Har du tatt en eller flere blunder iløpet av dagen?"
          options={["Ja", "Nei"]}
          optionDisplay={(options: string) => options}
          onChange={setHasNapped}
        />
      }
      {numberOfNaps > 0 && hasNapped === "Ja" ? (
        [...Array(numberOfNaps || 0).keys()].map((n) => (
          <Card style={{ maxWidth: "100%" }}>
            <Title
              style={{
                color: colors.primary,
                minWidth: "100%",
                textAlign: "center",
              }}
            >
              Noter ned tidspunkt for alle blundene
            </Title>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <TextField
                style={{ maxWidth: "30%", margin: 30 }}
                error={!napStringCorrect1[n]}
                placeholderText={"HH:MM"}
                onChange={(e) => {
                  setNaps((nap) => {
                    const timeRegex: RegExp =
                      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

                    if (timeRegex.test(e)) {
                      if (!naps[n]) {
                        naps[n] = [new Date(), new Date()];
                      }
                      naps[n][0] = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        parseInt(e.slice(0, 2)),
                        parseInt(e.slice(3))
                      );
                    }
                    return nap;
                  });
                  setNapStrings1((nap) => {
                    nap[n] = e;
                    return nap;
                  });
                  setNapStringCorrect1((nap) => {
                    const timeRegex: RegExp =
                      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

                    nap[n] = timeRegex.test(e);
                    setRefreshScreen(!refreshScreen);
                    return nap;
                  });
                }}
                value={napStrings1[n]}
              />
              <TextField
                style={{ maxWidth: "30%", margin: 30 }}
                error={!napStringCorrect2[n]}
                placeholderText={"HH:MM"}
                onChange={(e) => {
                  setNaps((nap) => {
                    const timeRegex: RegExp =
                      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

                    if (timeRegex.test(e)) {
                      if (!naps[n]) {
                        naps[n] = [new Date(), new Date()];
                      }
                      naps[n][1] = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        parseInt(e.slice(0, 2)),
                        parseInt(e.slice(3))
                      );
                    }
                    return nap;
                  });
                  setNapStrings2((nap) => {
                    nap[n] = e;
                    return nap;
                  });
                  setNapStringCorrect2((nap) => {
                    const timeRegex: RegExp =
                      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

                    nap[n] = timeRegex.test(e);
                    setRefreshScreen(!refreshScreen);
                    return nap;
                  });
                }}
                value={napStrings2[n]}
              />
            </View>
          </Card>
        ))
      ) : (
        <></>
      )}
      {hasNapped === "Ja" ? (
        <View style={{ flexDirection: "row" }}>
          <Button
            variant="outlined"
            onClick={() => setNumberOfNaps(numberOfNaps + 1)}
            style={{ padding: 10, margin: 10 }}
          >
            <Text
              style={{
                color: colors.primary,
                textAlign: "center",
              }}
            >
              Legg til en blund
            </Text>
          </Button>
          <Button
            variant="outlined"
            onClick={() => setNumberOfNaps(numberOfNaps - 1)}
            style={{ padding: 10, margin: 10 }}
          >
            <Text
              style={{
                color: colors.primary,
                textAlign: "center",
              }}
            >
              Fjern en blund
            </Text>
          </Button>
        </View>
      ) : (
        <></>
      )}

      <Select
        placeholderText="Hvor dyp var søvnen din i natt?"
        options={søvnvurdering}
        optionDisplay={(options: string) => options}
      />

      {
        <Select
          placeholderText="Drakk du alkohol, eller brukte du sovemedisiner for å sove i går?"
          options={["Ja", "Nei"]}
          optionDisplay={(options: string) => options}
          onChange={(answer) => {
            setSleepAides(answer === "Ja");
          }}
        />
      }
      {sleepAides ? (
        <>
          <Text style={{ color: colors.primary }}>
            Noter medikament og dose, samt eventuelt alkoholinntak
          </Text>
          <TextField
            style={{ width: "85%" }}
            value={sleepAidesDetails}
            onChange={setSleepAidesDetails}
          />
        </>
      ) : (
        <></>
      )}
    </Card>
  );
}
