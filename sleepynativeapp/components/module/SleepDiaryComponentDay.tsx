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
  const [dayRating, setDayRating] = useState<number>();
  const [dateValid, setDateValid] = useState<boolean>(true);

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

  const allNapsAreValid =
    (naps.every((nap) => nap.every((date) => date)) && naps.length !== 0) ||
    hasNapped === "Nei";

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
  useEffect(() => {
    console.log("hasNapped: ", hasNapped);
    console.log("dayRating: ", dayRating);
    console.log("allNapsAreValid: ", allNapsAreValid);
    console.log("Naps: ", naps);
    console.log("dateValid: ", dateValid);
  }, [hasNapped, dayRating, allNapsAreValid, dateValid]);

  const [sleepDiaryID, setSleepDiaryID] = useState<string>();

  async function updateStoredSleepDiary(): Promise<void> {
    if (storedSleepDiary) {
      const updatedDiaryEntries = await listDiaryEntries(storedSleepDiary.id);
      if (updatedDiaryEntries) {
        const tempdiary: SleepDiary = {
          ...storedSleepDiary,
          diary_entries: [...updatedDiaryEntries],
        };
        setStoredSleepDiary(tempdiary);
      }
    }
  }

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
          //setEntryValues();
        }
      });
      if (!found) {
        console.log("Entry does not exist");
        //resetEntryValues();
      }
    }
  }

  useEffect(() => {
    checkSleepDiaryEntries();
    console.log("DATE CHANGED");
  }, [date]);

  async function postEntry() {
    if (
      (!hasNapped || (hasNapped && allNapsAreValid)) &&
      storedSleepDiary &&
      storedSleepDiary.id
    ) {
      const diaryEntry: Pick<DiaryEntry, "day_rating" | "naps"> = {
        date:
          "" +
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate(),
        day_rating: dayRating ?? 0,
        //@ts-ignore
        naps: naps,
      };
      await checkSleepDiaryEntries();

      //console.log(sleepDiaryID, diaryEntry);
      await createDiaryEntry(storedSleepDiary.id, diaryEntry).then((entry) => {
        if (entry) {
          console.log("UPDATING ENTRIES");
          updateStoredSleepDiary();
        }
      });
    } else {
      console.log("DiaryEntry not valid");
    }
    //updateStoredSleepDiary();
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
          if (date) {
            setDateValid(true);
          } else {
            setDateValid(false);
          }
        }}
        initialState={{
          string:
            date.getDate() < 10
              ? "" +
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-0" +
                date.getDate()
              : "" +
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
        //@ts-ignore Kan ikke være udefinert, siden brukeren ikke kan trykke på knappen uten at man har valgt en verdi
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
        <View style={{ flexDirection: "row", maxWidth: "100%" }}>
          <Button
            variant="outlined"
            onClick={() => setNaps((naps) => [...naps, [false, false]])}
            style={{ padding: 10, margin: 10, maxWidth: "50%" }}
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
            style={{ padding: 10, margin: 10, maxWidth: "50%" }}
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
          dayRating === (null || undefined || 0) ||
          hasNapped === (undefined || "") ||
          !dateValid ||
          (hasNapped === "Ja" && !allNapsAreValid)
          /* dayRating === (null || undefined || 0) ||
          hasNapped === (undefined || "") ||
          (hasNapped === "Ja" && !allNapsAreValid) ||
          hasNapped !== ("Nei" || "Ja") ||
          !dateValid */
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
