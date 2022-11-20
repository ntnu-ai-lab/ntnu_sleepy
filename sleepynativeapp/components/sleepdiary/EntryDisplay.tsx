import React from "react";
import { Text, StyleSheet } from "react-native";
import { dateToLocalTime } from "../../api/sleepDiaryApi";
import { DiaryEntry } from "../../types/sleepDiary";
import { Button } from "../material/Button";

export function EntryDisplay({
  onEdit,
  entry,
}: {
  onEdit: () => void;
  entry: DiaryEntry;
}) {
  const styles = StyleSheet.create({
    text: {
      color: "white",
    },
  });
  return (
    <>
      <Button
        variant="outlined"
        style={{ width: "70%", padding: 5 }}
        onClick={onEdit}
      >
        <Text style={styles.text}>Rediger</Text>
      </Button>
    </>
  );
}
