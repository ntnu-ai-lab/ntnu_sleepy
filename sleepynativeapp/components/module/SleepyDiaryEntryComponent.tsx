import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Title, Text } from "react-native-paper";
import { useRecoilState } from "recoil";
import { finishDiaryEntry } from "../../api/sleepDiaryApi";
import { cachedSleepDiary, cachedSleepDiaryEntry } from "../../state/atoms";
import { colors } from "../../styles/styles";
import { DiaryEntry, SleepDiary } from "../../types/modules";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { Select } from "../material/Select";
import { TextField } from "../material/TextField";
import { TimeField } from "../material/TimeField";

export default function SleepyDiaryEntryComponent(props: {
  sleepDiaryEntry: DiaryEntry;
  index: number;
  sleepDiaryID: string;
}) {
  const [show, setShow] = useState(false);
  const søvnvurdering = ["Veldig lett", "Lett", "Middels", "Dyp", "Veldig dyp"];
  const dagvurdering = [
    "Veldig dårlig",
    "Dårlig",
    "Middels",
    "Bra",
    "Veldig bra",
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [sleepDiaryEntry, setSleepDiaryEntry] = useState<DiaryEntry>({
    ...props.sleepDiaryEntry,
    date: new Date(props.sleepDiaryEntry.date),
  });
  const [timeToSleep, setTimeToSleep] = useState<{
    value: number;
    text: string;
  }>({
    value: sleepDiaryEntry.time_to_sleep,
    text: sleepDiaryEntry.time_to_sleep.toString(),
  });
  const [numberOfNightWakes, setNumberOfNightWakes] = useState<{
    value: number;
    text: string;
  }>({
    value: sleepDiaryEntry.night_wakes ? sleepDiaryEntry.night_wakes.length : 0,
    text: sleepDiaryEntry.night_wakes
      ? sleepDiaryEntry.night_wakes.length.toString()
      : "0",
  });
  const [storedSleepDiary, setStoredSleepDiary] =
    useRecoilState(cachedSleepDiary);

  async function postEntry() {
    //console.log("DiaryID: " + sleepDiaryID, storedSleepDiary.id);
    //console.log("DiaryEntry: " + diaryEntry?.id);
    //console.log(bedtime, lightsOut, timeToSleep, waketime, risetime);
    console.log(sleepDiaryEntry, props.sleepDiaryID);
    if (
      props.sleepDiaryID &&
      sleepDiaryEntry &&
      sleepDiaryEntry.bedtime &&
      sleepDiaryEntry.lights_out &&
      sleepDiaryEntry.time_to_sleep &&
      sleepDiaryEntry.waketime &&
      sleepDiaryEntry.risetime
    ) {
      console.log("READY TO PATCH");

      setLoading(true);
      const entryResult = await finishDiaryEntry(
        props.sleepDiaryID,
        sleepDiaryEntry
      )
        .then((entry) => {
          if (entry) {
            console.log("Result", entry);
            const tempEntries = [...storedSleepDiary.diary_entries];
            tempEntries.push(entry);
            setStoredSleepDiary((diary) => ({
              ...diary,
              diary_entries: tempEntries,
            }));
            console.log("STORED: ", storedSleepDiary);
            //const temp = storedSleepDiary;
            //temp.diary_entries.push(entry);
            //storedSleepDiary.diary_entries.push(entry);
            //console.log("stored", temp);
            return entry;
            //setStoredSleepDiary(temp);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  }

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
              {sleepDiaryEntry.date.toDateString()}
            </Title>
          </TouchableOpacity>

          {show ? (
            <View style={{ alignItems: "center" }}>
              {/* <Text
                style={{
                  alignItems: "center",
                  color: colors.primary,
                }}
              >
                Hvor dypt sov du i natt?
              </Text>
              <TextField
                style={{ minWidth: "80%", alignItems: "center" }}
                value={søvnvurdering[sleepDiaryEntry.sleep_quality - 1]}
                editable={false}
              /> */}
              {/* <Text
                style={{
                  alignItems: "center",
                  color: colors.primary,
                }}
              >
                Hvordan har du fungert på dagtid?
              </Text>
              <TextField
                style={{ minWidth: "80%", alignItems: "center" }}
                value={dagvurdering[sleepDiaryEntry.day_rating - 1]}
                editable={false}
              /> */}
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
                  setSleepDiaryEntry((entry) => ({
                    ...entry,
                    day_rating: dagvurdering.indexOf(e) + 1,
                  }));
                }}
                value={dagvurdering[sleepDiaryEntry.day_rating - 1]}
              />
              <Card
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    alignItems: "center",
                    color: colors.primary,
                    marginTop: 30,
                  }}
                >
                  Drakk du alkohol, eller brukte du sovemedisiner for å sove i
                  går?
                </Text>
                <Select
                  placeholderText="Drakk du alkohol, eller brukte du sovemedisiner for å sove i går?"
                  options={["Ja", "Nei"]}
                  optionDisplay={(options: string) => options}
                  onChange={(answer) => {
                    //setSleepAides(answer === "Ja");
                    setSleepDiaryEntry((entry) => ({
                      ...entry,
                      sleep_aides: answer === "Ja",
                    }));
                  }}
                />
                {sleepDiaryEntry.sleep_aides ? (
                  <>
                    <Text style={{ color: colors.primary }}>
                      Noter medikament og dose, samt eventuelt alkoholinntak
                    </Text>
                    <TextField
                      style={{ minWidth: "100%" }}
                      value={sleepDiaryEntry.sleep_aides_detail}
                      //onChange={setSleepAidesDetails}
                      onChange={(arg: string) =>
                        setSleepDiaryEntry((entry) => ({
                          ...entry,
                          sleep_aides_detail: arg,
                        }))
                      }
                    />
                  </>
                ) : (
                  <></>
                )}
                <Text
                  style={{
                    alignItems: "center",
                    alignSelf: "center",
                    color: colors.primary,
                    marginTop: 10,
                  }}
                >
                  Når gikk du til sengs?
                </Text>
                <TimeField
                  //onChange={(date) => date && setBedtime(date)}
                  onChange={(date) =>
                    date &&
                    setSleepDiaryEntry((entry) => ({
                      ...entry,
                      bedtime: date,
                    }))
                  }
                  baseDate={sleepDiaryEntry.date}
                />
                <Text
                  style={{
                    alignItems: "center",
                    alignSelf: "center",
                    color: colors.primary,
                    marginTop: 10,
                  }}
                >
                  Når skrudde du av lyset?
                </Text>
                <TimeField
                  onChange={(date) =>
                    date &&
                    setSleepDiaryEntry((entry) => ({
                      ...entry,
                      lights_out: date,
                    }))
                  }
                  baseDate={sleepDiaryEntry.date}
                />
                <Text
                  style={{
                    alignItems: "center",
                    color: colors.primary,
                    marginTop: 10,
                  }}
                >
                  Hvor mange minutter tok det fra lyset var skrudd av til du
                  sovnet?
                </Text>
                <TextField
                  style={{
                    minWidth: "30%",
                    alignText: "center",
                    alignItems: "center",
                  }}
                  keyboardType="numeric"
                  placeholderText="          "
                  value={timeToSleep.text}
                  onChange={(e) => {
                    setTimeToSleep((prev) => ({
                      ...prev,
                      text: e,
                      value: parseInt(e),
                    }));
                    setSleepDiaryEntry((entry) => ({
                      ...entry,
                      time_to_sleep: parseInt(e),
                    }));
                  }}
                />
                <Text
                  style={{
                    alignItems: "center",
                    color: colors.primary,
                    marginTop: 10,
                  }}
                >
                  Hvor mange ganger våknet du iløpet av natten?
                </Text>
                <TextField
                  style={{
                    minWidth: "30%",
                    alignText: "center",
                    alignItems: "center",
                  }}
                  keyboardType="numeric"
                  placeholderText="          "
                  value={numberOfNightWakes.text}
                  onChange={(e) => {
                    setNumberOfNightWakes((prev) => ({
                      ...prev,
                      text: e,
                      value: parseInt(e),
                    }));
                  }}
                />
                {numberOfNightWakes.value &&
                numberOfNightWakes.value > 0 &&
                numberOfNightWakes.value <= 30 ? (
                  <Text
                    style={{
                      alignItems: "center",
                      minWidth: "30%",
                      color: colors.primary,
                      marginTop: 10,
                    }}
                  >
                    Noter ned antall minutter for hver gang du våknet
                  </Text>
                ) : (
                  <>{}</>
                )}
                {numberOfNightWakes.value &&
                numberOfNightWakes.value > 0 &&
                numberOfNightWakes.value <= 30 ? (
                  [...Array(numberOfNightWakes || 0).keys()].map((n) => (
                    <Card style={{ maxWidth: "100%", padding: 5, margin: 0 }}>
                      <TextField
                        style={{
                          minWidth: "30%",
                          alignText: "center",
                          alignItems: "center",
                        }}
                        placeholderText="          "
                        keyboardType="numeric"
                        value={
                          sleepDiaryEntry.night_wakes[n]?.toString() === "NaN"
                            ? ""
                            : sleepDiaryEntry.night_wakes[n]?.toString()
                        }
                        onChange={(e) => {
                          setSleepDiaryEntry((entry) => {
                            entry.night_wakes[n] = parseInt(e);
                            return { ...entry };
                          });
                        }}
                      />
                    </Card>
                  ))
                ) : (
                  <></>
                )}
                <Text
                  style={{
                    alignItems: "center",
                    color: colors.primary,
                    marginTop: 10,
                  }}
                >
                  Når våknet du på morgenen uten å få sove igjen? Noter ned ditt
                  endelige oppvåkningstidspunkt.
                </Text>
                <TimeField
                  onChange={(date) =>
                    date &&
                    setSleepDiaryEntry((entry) => ({
                      ...entry,
                      waketime: date,
                    }))
                  }
                />
                <Text
                  style={{
                    alignItems: "center",
                    minWidth: "30%",
                    color: colors.primary,
                    marginTop: 10,
                  }}
                >
                  Når stod du opp?
                </Text>
                <TimeField
                  onChange={(date) =>
                    date &&
                    setSleepDiaryEntry((entry) => ({
                      ...entry,
                      risetime: date,
                    }))
                  }
                />
                <Text
                  style={{
                    alignItems: "center",
                    color: colors.primary,
                    marginTop: 10,
                  }}
                >
                  Hvor dyp var søvnen din i natt?
                </Text>
                <Select
                  placeholderText="Hvordan var siste natts søvn totalt sett?"
                  options={søvnvurdering}
                  optionDisplay={(options: string) => options}
                  onChange={(e) => {
                    setSleepDiaryEntry((entry) => ({
                      ...entry,
                      sleep_quality: søvnvurdering.indexOf(e) + 1,
                    }));
                  }}
                />
                <Text
                  style={{
                    alignItems: "center",
                    color: colors.primary,
                    marginTop: 10,
                  }}
                >
                  Notater
                </Text>
                <TextField
                  multiline={true}
                  value={sleepDiaryEntry.notes}
                  editable={true}
                  onChange={(e) => {
                    setSleepDiaryEntry((entry) => ({
                      ...entry,
                      notes: e,
                    }));
                  }}
                  style={{ marginBottom: 30, minWidth: "100%" }}
                />
                <Button
                  style={{ width: "70%", marginBottom: 30 }}
                  variant="outlined"
                  //onClick={() => postEntry()}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      textAlign: "center",
                      padding: 3,
                    }}
                  >
                    {loading ? "Lagrer dagbok..." : "Lagre dagbok"}
                  </Text>
                </Button>
              </Card>
            </View>
          ) : (
            <View />
          )}
        </Card>
      </View>
    </>
  );
}
