import React, { useState } from "react";
import { View } from "react-native";
import { colors } from "../../styles/styles";
import { Nap } from "../../types/modules";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { Divider, Text, Title } from "react-native-paper";
import { Select } from "../material/Select";
import { TextField } from "../material/TextField";

export default function SleepDiaryComponentDay() {
  const [date, setDate] = useState<Date>(new Date());
  const [dayRating, setDayRating] = useState<number>();

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
    </Card>
  );
}
