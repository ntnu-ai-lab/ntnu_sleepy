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

  function saveDiary(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Card
      style={{
        alignItems: "center",
        alignSelf: "center",
        width: "70%",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          alignItems: "center",
          color: colors.primary,
          marginTop: 30,
        }}
      >
        Fyll inn spørsmål 1 og 2 før sengetid:
      </Text>
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Hvordan har du fungert på dagtid?
      </Text>

      <Select
        placeholderText="Hvordan har du fungert på dagtid?"
        options={dagvurdering}
        optionDisplay={(options: string) => options}
        onChange={(e) => {
          setDayRating(dagvurdering.indexOf(e) + 1);
        }}
      />
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Har du tatt en eller flere blunder iløpet av dagen?
      </Text>
      {
        <Select
          placeholderText="Har du tatt en eller flere blunder iløpet av dagen?"
          options={["Ja", "Nei"]}
          optionDisplay={(options: string) => options}
          onChange={setHasNapped}
        />
      }
      {numberOfNaps > 0 && hasNapped === "Ja" ? (
        <Text
          style={{
            color: colors.primary,
            minWidth: "100%",
            textAlign: "center",
          }}
        >
          Noter ned tidspunkt for alle blundene
        </Text>
      ) : (
        <></>
      )}
      {numberOfNaps > 0 && hasNapped === "Ja" ? (
        [...Array(numberOfNaps || 0).keys()].map((n) => (
          <Card style={{ maxWidth: "100%", padding: 5, margin: 0 }}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <TextField
                style={{ maxWidth: "30%", margin: 30 }}
                error={!naps.startCorrects[n]}
                placeholderText={"HH:MM"}
                onChange={(e) => {
                  setNaps((nap) => {
                    const timeRegex: RegExp =
                      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

                    if (timeRegex.test(e)) {
                      if (!naps.naps[n]) {
                        naps.naps[n] = [new Date(), new Date()];
                      }
                      naps.naps[n][0] = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        parseInt(e.slice(0, 2)),
                        parseInt(e.slice(3))
                      );
                    }
                    return nap;
                  });
                  setNaps((nap) => {
                    nap.startStrings[n] = e;
                    return nap;
                  });
                  setNaps((nap) => {
                    if (e.length < 4 || (e.length < 5 && e.includes(":"))) {
                      naps.startCorrects[n] = true;
                      setRefreshScreen(!refreshScreen);
                      return nap;
                    } else {
                      const timeRegex: RegExp =
                        /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

                      naps.startCorrects[n] = timeRegex.test(e);
                      setRefreshScreen(!refreshScreen);
                      return nap;
                    }
                  });
                }}
                value={naps.startStrings[n]}
              />
              <TextField
                style={{ maxWidth: "30%", margin: 30 }}
                error={!naps.endCorrects[n]}
                placeholderText={"HH:MM"}
                onChange={(e) => {
                  setNaps((nap) => {
                    const timeRegex: RegExp =
                      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

                    if (timeRegex.test(e)) {
                      if (!naps.naps[n]) {
                        naps.naps[n] = [new Date(), new Date()];
                      }
                      naps.naps[n][0] = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        parseInt(e.slice(0, 2)),
                        parseInt(e.slice(3))
                      );
                    }
                    return nap;
                  });
                  setNaps((nap) => {
                    nap.endStrings[n] = e;
                    return nap;
                  });
                  setNaps((nap) => {
                    if (e.length < 4 || (e.length < 5 && e.includes(":"))) {
                      naps.endCorrects[n] = true;
                      setRefreshScreen(!refreshScreen);
                      return nap;
                    } else {
                      const timeRegex: RegExp =
                        /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

                      naps.endCorrects[n] = timeRegex.test(e);
                      setRefreshScreen(!refreshScreen);
                      return nap;
                    }
                  });
                }}
                value={naps.endStrings[n]}
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

      <Text
        style={{
          fontSize: 20,
          alignItems: "center",
          color: colors.primary,
          marginTop: 30,
        }}
      >
        Fyll inn resten om morgenen:
      </Text>

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
            style={{ width: "85%" }}
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
      <TextField
        style={{ minWidth: 150, maxWidth: "30%", alignItems: "center" }}
        error={!bedtime.correct}
        placeholderText={"HH:MM"}
        onChange={(e) => {
          setBedtime((time) => {
            const timeRegex: RegExp =
              /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

            if (timeRegex.test(e)) {
              time.date = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                parseInt(e.slice(0, 2)),
                parseInt(e.slice(3))
              );
            }
            return time;
          });
          setBedtime((time) => {
            time.string = e;
            return time;
          });
          setBedtime((time) => {
            if (e.length < 4 || (e.length < 5 && e.includes(":"))) {
              time.correct = true;
              setRefreshScreen(!refreshScreen);
              return time;
            } else {
              const timeRegex: RegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

              time.correct = timeRegex.test(e);
              setRefreshScreen(!refreshScreen);
              return time;
            }
          });
        }}
        value={bedtime.string}
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
      <TextField
        style={{ minWidth: 150, maxWidth: "30%", alignItems: "center" }}
        error={!lightsOut.correct}
        placeholderText={"HH:MM"}
        onChange={(e) => {
          setLightsOut((time) => {
            const timeRegex: RegExp =
              /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

            if (timeRegex.test(e)) {
              time.date = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                parseInt(e.slice(0, 2)),
                parseInt(e.slice(3))
              );
            }
            return time;
          });
          setLightsOut((time) => {
            time.string = e;
            return time;
          });
          setLightsOut((time) => {
            if (e.length < 4 || (e.length < 5 && e.includes(":"))) {
              time.correct = true;
              setRefreshScreen(!refreshScreen);
              return time;
            } else {
              const timeRegex: RegExp =
                /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

              time.correct = timeRegex.test(e);
              setRefreshScreen(!refreshScreen);
              return time;
            }
          });
        }}
        value={lightsOut.string}
      />

      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Hvor mange minutter tok det fra lyset var skrudd av til du sovnet?
      </Text>
      <TextField
        style={{ maxWidth: "20%" }}
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

      <TextField
        style={{ minWidth: 150, maxWidth: "30%", alignItems: "center" }}
        error={!waketime.correct}
        placeholderText={"HH:MM"}
        onChange={(e) => {
          setWaketime((time) => {
            const timeRegex: RegExp =
              /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

            if (timeRegex.test(e)) {
              time.date = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                parseInt(e.slice(0, 2)),
                parseInt(e.slice(3))
              );
            }
            return time;
          });
          setWaketime((time) => {
            time.string = e;
            return time;
          });
          setWaketime((time) => {
            if (e.length < 4 || (e.length < 5 && e.includes(":"))) {
              time.correct = true;
              setRefreshScreen(!refreshScreen);
              return time;
            } else {
              const timeRegex: RegExp =
                /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

              time.correct = timeRegex.test(e);
              setRefreshScreen(!refreshScreen);
              return time;
            }
          });
        }}
        value={waketime.string}
      />
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Når stod du opp?
      </Text>

      <TextField
        style={{ minWidth: 150, maxWidth: "30%", alignItems: "center" }}
        error={!risetime.correct}
        placeholderText={"HH:MM"}
        onChange={(e) => {
          setRisetime((time) => {
            const timeRegex: RegExp =
              /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

            if (timeRegex.test(e)) {
              time.date = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                parseInt(e.slice(0, 2)),
                parseInt(e.slice(3))
              );
            }
            return time;
          });
          setRisetime((time) => {
            time.string = e;
            return time;
          });
          setRisetime((time) => {
            if (e.length < 4 || (e.length < 5 && e.includes(":"))) {
              time.correct = true;
              setRefreshScreen(!refreshScreen);
              return time;
            } else {
              const timeRegex: RegExp =
                /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

              time.correct = timeRegex.test(e);
              setRefreshScreen(!refreshScreen);
              return time;
            }
          });
        }}
        value={risetime.string}
      />

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
        style={{ marginBottom: 30 }}
      />
      <Button
        style={{ width: "50%", marginBottom: 30 }}
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
