import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { colors } from "../../styles/styles";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { Text } from "react-native-paper";
import { Select } from "../material/Select";
import { DateField } from "../material/DateField";
import { DiaryEntry, SleepDiary } from "../../types/modules";
import {
  createDiaryEntry,
  getDiary,
  listDiaryEntries,
} from "../../api/sleepDiaryApi";
import { parseSync } from "@babel/core";

export default function SleepDiaryComponentDay() {
  const [date] = useState<Date>(new Date()); //TODO hent date fra frontend
  const [dayRating, setDayRating] = useState<number>(0);

  const [hasNapped, setHasNapped] = useState<string>("");
  const [naps, setNaps] = useState<[Date | false, Date | false][]>([]);
  const dagvurdering = [
    "Veldig dårlig",
    "Dårlig",
    "Middels",
    "Bra",
    "Veldig bra",
  ];

  const allNapsAreValid = naps.every((nap) => nap.every((date) => date));

  async function checkSleepDiary(): Promise<void> {
    {
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

  async function postEntry() {
    if (allNapsAreValid && sleepDiaryID) {
      const diaryEntry: Pick<DiaryEntry, "day_rating" | "naps"> = {
        date:
          "" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
        day_rating: dayRating,
        //@ts-ignore
        naps: naps,
      };

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
              <DateField
                baseDate={date}
                onChange={(nap) =>
                  setNaps((naps) => {
                    naps[n][0] = nap;
                    return [...naps];
                  })
                }
              />
              <DateField
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
        <></>
      )}

      <Button
        style={{ width: "50%" }}
        //onClick={() => postSleepDiaryEntry()} //TODO add this function
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
