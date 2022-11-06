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
  const [rerender, setRerender] = useState<boolean>(false);
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

  const allNapsAreValid = naps.every((nap) => nap.every((date) => date));

  async function checkSleepDiary(): Promise<void> {
    if (storedSleepDiary) {
      console.log("Found sleepdiary from AsyncStorage!", storedSleepDiary.id);
    } else {
      console.log(
        "Could not find sleepdiary in AsyncStorage, fetching from db.."
      );
      const diary = await getDiary();
      //console.log(diary);
      if (diary !== undefined) {
        setStoredSleepDiary(diary);
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
    console.log("dateValid: ", dateValid);
  }, [hasNapped, dayRating, allNapsAreValid, dateValid]);

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
          //setStoredSleepDiaryEntry(entry);
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

  async function updateStoredSleepDiary(): Promise<void> {
    console.log("Trying to update stored sleepdiary");
    if (storedSleepDiary) {
      console.log("Fetching entries");
      const updatedDiaryEntries = await listDiaryEntries(storedSleepDiary.id);
      if (updatedDiaryEntries) {
        const tempdiary: SleepDiary = {
          ...storedSleepDiary,
          diary_entries: [...updatedDiaryEntries],
        };
        console.log("Updating stored sleepdiary");
        setStoredSleepDiary(tempdiary);
      }
    }
  }

  async function postEntry() {
    if (allNapsAreValid && storedSleepDiary && storedSleepDiary.id) {
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

      console.log(storedSleepDiary.id, diaryEntry);
      await createDiaryEntry(storedSleepDiary.id, diaryEntry)
        .then((entry) => {
          if (entry) {
            updateStoredSleepDiary();
            /* const finalEntry: DiaryEntry = {
              id: entry.id ?? "",
              //@ts-ignore kan sendes til backend uten verdi, legges til av brukeren senere
              date: entry.date,
              sleep_aides: entry.sleep_aides ?? false,
              sleep_aides_detail: entry.sleep_aides_detail ?? "",
              notes: entry.notes ?? "",
              sleep_quality: entry.sleep_quality ?? 0,
              //@ts-ignore
              bedtime: entry.bedtime,
              //@ts-ignore
              lights_out: entry.lights_out,
              time_to_sleep: entry.time_to_sleep ?? 0,
              night_wakes: entry.night_wakes ?? [0],
              //@ts-ignore
              waketime: entry.waketime,
              //@ts-ignore
              risetime: entry.risetime,
              //@ts-ignore Kan ikke være udefinert, siden brukeren ikke kan trykke på knappen uten at man har valgt en verdi
              day_rating: entry.day_rating,
              naps: entry.naps ?? [],
            };

            console.log("Result", entry);
            if (storedSleepDiary?.diary_entries) {
              const tempEntries = [
                finalEntry,
                ...storedSleepDiary.diary_entries,
              ];
              const newDiary = {
                ...storedSleepDiary,
                diary_entries: [...tempEntries],
              };
              setStoredSleepDiary(newDiary);
            } */
          }
        })
        .catch((err) => console.log("ERROR: ", err));
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
          if (date) {
            setDateValid(true);
          } else {
            setDateValid(false);
          }
        }}
        initialState={{
          string:
            "" +
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1 > 10
              ? date.getMonth() + 1
              : "0" + date.getMonth() + 1) +
            "-" +
            (date.getDate() > 10 ? date.getDate() : "0" + date.getDate()),
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
          hasNapped === (undefined || "")
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
