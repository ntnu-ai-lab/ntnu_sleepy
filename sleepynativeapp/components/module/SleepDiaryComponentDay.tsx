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
import { useRecoilState } from "recoil";
import { cachedSleepDiary, cachedSleepDiaryEntry } from "../../state/atoms";

export default function SleepDiaryComponentDay() {
  const [date, setDate] = useState<Date>(new Date()); //TODO hent date fra frontend
  const [dayRating, setDayRating] = useState<number>(0);
  const [rerender, setRerender] = useState<boolean>(false);

  const [hasNapped, setHasNapped] = useState<"Ja" | "Nei" | "">("");
  const [naps, setNaps] = useState<[Date | false, Date | false][]>([]);
  const dagvurdering = [
    "Veldig dårlig",
    "Dårlig",
    "Middels",
    "Bra",
    "Veldig bra",
  ];

  const [storedSleepDiary, setStoredSleepDiary] =
    useRecoilState(cachedSleepDiary);

  const [diaryEntry, setStoredSleepDiaryEntry] = useRecoilState(
    cachedSleepDiaryEntry
  );

  const allNapsAreValid = naps.every((nap) => nap.every((date) => date));

  async function checkSleepDiary(): Promise<void> {
    if (storedSleepDiary) {
      console.log("Found sleepdiary from AsyncStorage!");
    } else {
      console.log(
        "Could not find sleepdiary in AsyncStorage, fetching from db.."
      );
      const diary = await getDiary();
      //console.log(diary);
      if (diary !== undefined) {
        setSleepDiaryID(diary.id);
      }
    }
  }

  useEffect(() => {
    checkSleepDiary();
  }, []);

  const [sleepDiaryID, setSleepDiaryID] = useState<string>();

  async function checkSleepDiaryEntries(): Promise<void> {
    if (storedSleepDiary) {
      let found: boolean = false;
      storedSleepDiary.diary_entries.map((entry) => {
        const temp = new Date(entry.date);

        if (
          temp.getFullYear() === date.getFullYear() &&
          temp.getMonth() === date.getMonth() &&
          temp.getDate() === date.getDate()
        ) {
          found = true;
          console.log("Entry already exists");
          setStoredSleepDiaryEntry(entry);
          setEntryValues();
        }
      });
      if (!found) {
        console.log("Entry does not exist");
        //resetEntryValues();
      }
    }

    /* if (sleepDiaryID) {
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
                  setStoredSleepDiaryEntry(entry);
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
    } */
  }

  useEffect(() => {
    checkSleepDiaryEntries();
    console.log("DATE CHANGED");
  }, [date]);

  function setEntryValues(): void {
    setDayRating(diaryEntry.day_rating);
    diaryEntry.naps.length > 0 ? setHasNapped("Ja") : setHasNapped("Nei");
    setNaps(diaryEntry.naps);
    console.log(dayRating);
  }

  function resetEntryValues(): void {
    setDayRating(0);
    setHasNapped("");
    setNaps([]);
  }

  async function postEntry() {
    if (allNapsAreValid && storedSleepDiary.id) {
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
      const error = await createDiaryEntry(storedSleepDiary.id, diaryEntry);
      console.log(error);
    } else {
      console.log("DiaryEntry not valid");
      console.log(allNapsAreValid, sleepDiaryID);
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
