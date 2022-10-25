import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { colors } from "../../styles/styles";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { Text } from "react-native-paper";
import { Select } from "../material/Select";
import { TimeField } from "../material/TimeField";
import { DiaryEntry, SleepDiary } from "../../types/modules";
import {
  createDiaryEntry,
  getDiary,
  listDiaryEntries,
} from "../../api/sleepDiaryApi";

import { DateField } from "../material/DateField";

export default function SleepDiaryComponentDay() {
  const [date, setDate] = useState<Date>(new Date()); //TODO hent date fra frontend
  const [dayRating, setDayRating] = useState<number>(0);
  const [rerender, setRerender] = useState<boolean>(false);
  const [rerender2, setRerender2] = useState<boolean>(true);

  const [hasNapped, setHasNapped] = useState<"Ja" | "Nei" | "">("");
  const [naps, setNaps] = useState<[Date | false, Date | false][]>([]);
  const dagvurdering = [
    "Veldig dårlig",
    "Dårlig",
    "Middels",
    "Bra",
    "Veldig bra",
  ];

  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry>();

  const allNapsAreValid = naps.every((nap) => nap.every((date) => date));

  async function checkSleepDiary(): Promise<void> {
    const diary = await getDiary();
    //console.log(diary);
    if (diary !== undefined) {
      setSleepDiaryID(diary.id);
    }
  }

  useEffect(() => {
    console.log("Current date: " + date);
  }, [date]);

  useEffect(() => {
    checkSleepDiary();
  }, []);

  const [sleepDiaryID, setSleepDiaryID] = useState<string>();

  async function checkSleepDiaryEntries(): Promise<void> {
    if (sleepDiaryID) {
      await listDiaryEntries(sleepDiaryID)
        .then((res) => {
          if (res) {
            let found: boolean = false;
            res.map((entry) => {
              if (entry) {
                const temp = new Date(entry.date);
                if (
                  temp.getFullYear() === date.getFullYear() &&
                  temp.getMonth() === date.getMonth() &&
                  temp.getDate() === date.getDate()
                ) {
                  found = true;
                  console.log("Entry already exists");
                  setDiaryEntry(entry);
                  setEntryValues(entry);
                }
              }
            });
            if (!found) {
              console.log("Entry does not exist");
              resetEntryValues();
            }
          }
        })
        .catch((e) => console.error(e));
    }
  }

  useEffect(() => {
    checkSleepDiaryEntries();
    console.log("DATE CHANGED");
  }, [date]);

  function setEntryValues(entry: DiaryEntry): void {
    setDayRating(entry.day_rating);
    entry.naps.length > 0 ? setHasNapped("Ja") : setHasNapped("Nei");
    setNaps(entry.naps);
    setRerender(true);
  }

  function resetEntryValues(): void {
    setDayRating(0);
    setHasNapped("");
    setNaps([]);
    setRerender2(true);
  }

  async function postEntry() {
    if (allNapsAreValid && sleepDiaryID) {
      console.log(
        "DATE: " +
          date +
          date.getFullYear() +
          date.getMonth() +
          1 +
          date.getDate()
      );
      const diaryEntry: Pick<DiaryEntry, "day_rating" | "naps"> = {
        date:
          "" +
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate(),
        day_rating: dayRating,
        //@ts-ignore
        naps: naps,
      };
      await checkSleepDiaryEntries();

      console.log(sleepDiaryID, diaryEntry);
      const error = await createDiaryEntry(sleepDiaryID, diaryEntry);
      console.log(error);
    } else {
      console.log("DiaryEntry not valid");
    }
  }

  return (
    <Card
      style={{
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Text
        style={{ alignItems: "center", color: colors.primary, marginTop: 10 }}
      >
        Velg dato for søvndagbok
      </Text>
      <DateField
        onChange={(date) => {
          date &&
            setDate(
              new Date(date.getFullYear(), date.getMonth(), date.getDate())
            );
          setRerender(false);
        }}
        initialState={{
          string:
            "" +
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate(),
          date: date,
          valid: true,
        }}
      />
      {rerender ? (
        <View>
          <Text
            style={{
              alignItems: "center",
              color: colors.primary,
              marginTop: 10,
            }}
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
            value={dagvurdering[dayRating]}
          />
          <Text
            style={{
              alignItems: "center",
              color: colors.primary,
              marginTop: 10,
            }}
          >
            Har du tatt en eller flere blunder iløpet av dagen?
          </Text>
          <Select
            placeholderText="Har du tatt en eller flere blunder iløpet av dagen?"
            options={["Ja", "Nei"]}
            optionDisplay={(options: string) => options}
            onChange={setHasNapped}
            value={hasNapped}
          />
          {naps.length > 0 && hasNapped === "Ja" ? (
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
          {naps.length > 0 && hasNapped === "Ja" ? (
            naps.map((_, n) => (
              <Card style={{ maxWidth: "100%", padding: 5, margin: 0 }} key={n}>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <TimeField
                    baseDate={date}
                    onChange={(nap) =>
                      setNaps((naps) => {
                        naps[n][0] = nap;
                        return [...naps];
                      })
                    }
                  />
                  <TimeField
                    baseDate={date}
                    onChange={(nap) =>
                      setNaps((naps) => {
                        naps[n][1] = nap;
                        return [...naps];
                      })
                    }
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
                onClick={() => setNaps((naps) => [...naps, [false, false]])}
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
                onClick={() =>
                  setNaps((naps) => {
                    naps.pop();
                    return [...naps];
                  })
                }
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
            <View />
          )}
        </View>
      ) : rerender2 ? (
        <View>
          <Text
            style={{
              alignItems: "center",
              color: colors.primary,
              marginTop: 10,
            }}
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
            value={dagvurdering[dayRating]}
          />
          <Text
            style={{
              alignItems: "center",
              color: colors.primary,
              marginTop: 10,
            }}
          >
            Har du tatt en eller flere blunder iløpet av dagen?
          </Text>
          <Select
            placeholderText="Har du tatt en eller flere blunder iløpet av dagen?"
            options={["Ja", "Nei"]}
            optionDisplay={(options: string) => options}
            onChange={setHasNapped}
            value={hasNapped}
          />
          {naps.length > 0 && hasNapped === "Ja" ? (
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
          {naps.length > 0 && hasNapped === "Ja" ? (
            naps.map((_, n) => (
              <Card style={{ maxWidth: "100%", padding: 5, margin: 0 }} key={n}>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <TimeField
                    baseDate={date}
                    onChange={(nap) =>
                      setNaps((naps) => {
                        naps[n][0] = nap;
                        return [...naps];
                      })
                    }
                  />
                  <TimeField
                    baseDate={date}
                    onChange={(nap) =>
                      setNaps((naps) => {
                        naps[n][1] = nap;
                        return [...naps];
                      })
                    }
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
                onClick={() => setNaps((naps) => [...naps, [false, false]])}
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
                onClick={() =>
                  setNaps((naps) => {
                    naps.pop();
                    return [...naps];
                  })
                }
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
            <View />
          )}
        </View>
      ) : (
        <View />
      )}

      <Button
        style={{ width: "50%" }}
        variant="outlined"
        disabled={
          dayRating === 0 ||
          hasNapped === undefined ||
          (hasNapped === "Ja" && !allNapsAreValid)
        }
        onClick={() => postEntry()}
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
