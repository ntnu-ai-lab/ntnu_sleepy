import React, { useState } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { dateToLocalTime } from "../../api/sleepDiaryApi";
import { colors } from "../../styles/styles";
import { DiaryEntry, SleepDiary } from "../../types/sleepDiary";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { EntryDisplay } from "./EntryDisplay";
import { EntryForm } from "./EntryForm";

export function DiaryEntryComponent({
  entry,
  diaryId,
  refresh,
}: {
  entry: DiaryEntry;
  diaryId: SleepDiary["id"];
  refresh: () => void;
}) {
  const [edit, setEdit] = useState(!entry.finished);
  const [expand, setExpand] = useState(false);
  const styles = StyleSheet.create({
    text: {
      color: "white",
    },
  });

  return (
    <View>
      <Card
        style={{
          alignItems: "center",
          alignSelf: "center",
          width:
            Dimensions.get("window").height / Dimensions.get("window").width <
            16 / 9
              ? "70%"
              : "90%",
        }}
      >
        <Button
          variant={entry.finished ? undefined : "outlined"}
          onClick={() => setExpand(!expand)}
        >
          <Text
            style={{
              fontSize: 18,
              color: colors.primary,
              minWidth: "100%",
              textAlign: "center",
            }}
          >
            {" "}
            {entry.date.toDateString()}{" "}
          </Text>
          {entry.finished && (
            <>
              {/* I use a template literal here so all the spaces get rendered. */}
              <Text style={styles.text}>{`${dateToLocalTime(
                entry.bedtime
              )}–${dateToLocalTime(
                entry.fall_asleep_time
              )}          —          ${dateToLocalTime(
                entry.waketime
              )}–${dateToLocalTime(entry.risetime)}`}</Text>
              <Text style={styles.text}>
                Effektivitet:{" "}
                {entry.efficiency ? Math.round(entry.efficiency * 100) : "n/a"}%
              </Text>
            </>
          )}
        </Button>
        {expand &&
          (edit ? (
            <EntryForm
              sleepDiaryEntry={entry}
              sleepDiaryID={diaryId}
              onFinish={() => {
                setEdit(false);
                refresh();
              }}
              onAbort={() => setEdit(false)}
            />
          ) : (
            <EntryDisplay onEdit={() => setEdit(true)} entry={entry} />
          ))}
      </Card>
    </View>
  );
}
