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
      <Text style={styles.text}>
        Blunder på dagen:{" "}
        {entry.naps
          .map((nap) => `${dateToLocalTime(nap[0])}–${dateToLocalTime(nap[1])}`)
          .join(", ") || "Ingen"}
      </Text>
      <Text style={styles.text}>
        Våken på natten: {entry.night_wakes.join(" min, ") || "Ingen"}
      </Text>
      <Text style={styles.text}>Form på dagen: {entry.day_rating}/5</Text>
      <Text style={styles.text}>Søvndybde: {entry.sleep_quality}/5</Text>
      <Text style={styles.text}>
        Medikamenter: {entry.sleep_aides_detail || "Ingen"}
      </Text>
      <Text style={styles.text}>Notater: {entry.notes}</Text>
    </>
  );
}
