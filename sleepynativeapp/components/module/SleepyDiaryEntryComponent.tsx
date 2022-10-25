import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Title, Text } from "react-native-paper";
import { colors } from "../../styles/styles";
import { DiaryEntry } from "../../types/modules";
import { Card } from "../material/Card";
import { TextField } from "../material/TextField";

export default function SleepyDiaryEntryComponent(props: {
  sleepDiaryEntry: DiaryEntry;
  index: number;
}) {
  const [show, setShow] = useState(false);
  const søvnvurdering = ["Veldig dyp", "Dyp", "Middels", "Lett", "Veldig dyp"];
  const dagvurdering = [
    "Veldig bra",
    "Bra",
    "Middels",
    "Dårlig",
    "Veldig dårlig",
  ];

  return (
    <>
      <View key={props.index}>
        <Card
          style={{
            alignItems: "center",
            alignSelf: "center",
            width: "70%",
          }}
        >
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Title
              style={{
                color: colors.primary,
                minWidth: "100%",
                textAlign: "center",
              }}
            >
              {props.sleepDiaryEntry.date.toString()}
            </Title>
          </TouchableOpacity>

          {show ? (
            <View style={{ alignItems: "center" }}>
              <TextField
                style={{ minWidth: "80%" }}
                value={props.sleepDiaryEntry.notes}
                editable={false}
                multiline={true}
              />
              <Text
                style={{
                  alignItems: "center",
                  color: colors.primary,
                }}
              >
                Hvor dypt sov du i natt?
              </Text>
              <TextField
                style={{ minWidth: "80%", alignItems: "center" }}
                value={søvnvurdering[props.sleepDiaryEntry.sleep_quality - 1]}
                editable={false}
              />
              <Text
                style={{
                  alignItems: "center",
                  color: colors.primary,
                }}
              >
                Hvordan har du fungert på dagtid?
              </Text>
              <TextField
                style={{ minWidth: "80%", alignItems: "center" }}
                value={dagvurdering[props.sleepDiaryEntry.day_rating - 1]}
                editable={false}
              />
            </View>
          ) : (
            <View />
          )}
        </Card>
      </View>
    </>
  );
}
