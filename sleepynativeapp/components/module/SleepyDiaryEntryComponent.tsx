import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { Title, Text } from "react-native-paper";
import { useRecoilState } from "recoil";
import { finishDiaryEntry } from "../../api/sleepDiaryApi";
import { cachedSleepDiary, cachedSleepDiaryEntry } from "../../state/atoms";
import { colors } from "../../styles/styles";
import { DiaryEntry, SleepDiary } from "../../types/modules";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { DateField } from "../material/DateField";
import { Select } from "../material/Select";
import { TextField } from "../material/TextField";
import { TimeField } from "../material/TimeField";

export default function SleepyDiaryEntryComponent(props: {
  sleepDiaryEntry: DiaryEntry;
  index: number;
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
    night_wakes:
      props.sleepDiaryEntry.night_wakes !== null
        ? props.sleepDiaryEntry.night_wakes
        : [],
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
    value:
      sleepDiaryEntry.night_wakes !== (null && undefined && 0)
        ? sleepDiaryEntry.night_wakes.length
        : 0,
    text:
      sleepDiaryEntry.night_wakes !== null
        ? sleepDiaryEntry.night_wakes.length.toString()
        : "0",
  });
  const [storedSleepDiary, setStoredSleepDiary] =
    useRecoilState(cachedSleepDiary);
  const [hasNapped, setHasNapped] = useState<string>(
    sleepDiaryEntry.naps.length !== 0 ? "Ja" : "Nei"
  );
  const [naps, setNaps] = useState<[Date | false, Date | false][]>([
    ...sleepDiaryEntry.naps,
  ]);
  const [sleepTimeDate, setSleepTimeDate] = useState<Date>(
    sleepDiaryEntry.date
  );
  const [lightsOutDate, setLightsOutDate] = useState<Date>(
    sleepDiaryEntry.date
  );

  const [wakeDate, setWakeDate] = useState<Date>(
    new Date(
      sleepDiaryEntry.date.getFullYear(),
      sleepDiaryEntry.date.getMonth(),
      sleepDiaryEntry.date.getDate() + 1
    )
  );
  const [riseDate, setRiseDate] = useState<Date>(
    new Date(
      sleepDiaryEntry.date.getFullYear(),
      sleepDiaryEntry.date.getMonth(),
      sleepDiaryEntry.date.getDate() + 1
    )
  );

  const allNapsAreValid = naps.every((nap) => nap.every((date) => date));

  const [allValuesAreValid, setAllValuesAreValid] = useState<boolean>(false);

  async function postEntry() {
    console.log(sleepDiaryEntry, storedSleepDiary?.id);
    if (
      storedSleepDiary &&
      storedSleepDiary.id &&
      sleepDiaryEntry &&
      sleepDiaryEntry.bedtime &&
      sleepDiaryEntry.lights_out &&
      sleepDiaryEntry.time_to_sleep !== (null || undefined) &&
      sleepDiaryEntry.waketime &&
      sleepDiaryEntry.risetime
    ) {
      console.log("READY TO PATCH");
      /* if (allNapsAreValid) {
        //@ts-ignore
        setSleepDiaryEntry((entry) => ({
          ...entry,
          naps: [...naps], //ts ignore fordi alle naps er valid
        }));
      } */
      const { date, ...rest } = sleepDiaryEntry;
      setLoading(true);
      if (
        storedSleepDiary &&
        storedSleepDiary.id &&
        storedSleepDiary.diary_entries
      )
        await finishDiaryEntry(storedSleepDiary.id, rest)
          .then((entry) => {
            if (entry) {
              console.log("Result", entry);
              const tempEntries = [...storedSleepDiary.diary_entries];
              //tempEntries.push(entry);
              tempEntries.map(
                (entry) => tempEntries.find((o) => o.id === entry.id) || entry
              );

              //@ts-ignore
              setStoredSleepDiary((diary) => ({
                ...diary,
                diary_entries: tempEntries,
              }));
              //console.log("STORED: ", storedSleepDiary);
              return entry;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
    setLoading(false);
  }

  useEffect(() => {
    //console.log(sleepDiaryEntry.night_wakes);
  }, [sleepDiaryEntry.night_wakes]);

  useEffect(() => {
    if (
      storedSleepDiary?.id &&
      sleepDiaryEntry &&
      sleepDiaryEntry.bedtime &&
      sleepDiaryEntry.lights_out &&
      sleepDiaryEntry.time_to_sleep !== (null || undefined) &&
      sleepDiaryEntry.waketime &&
      sleepDiaryEntry.risetime &&
      sleepDiaryEntry.sleep_quality &&
      allNapsAreValid
    ) {
      setAllValuesAreValid(true);
    } else {
      setAllValuesAreValid(false);
    }
    //console.log(sleepDiaryEntry);
  }, [sleepDiaryEntry]);

  const styles = StyleSheet.create({
    card: {},
    text: {
      alignItems: "center",
      color: colors.primary,
      marginTop: 10,
    },
    timefield: {
      width:
        Dimensions.get("window").height / Dimensions.get("window").width <
        16 / 9
          ? "30%"
          : "40%",
    },
    datefield: {
      width:
        Dimensions.get("window").height / Dimensions.get("window").width <
        16 / 9
          ? "90%"
          : "100%",
    },
    dateAndTimeView: {
      flexDirection:
        Dimensions.get("window").height / Dimensions.get("window").width <
        16 / 9
          ? "row"
          : "column",
    },
    textfield: {
      minWidth: "30%",
      alignText: "center",
      alignItems: "center",
    },
    savebutton: {
      color: colors.primary,
      textAlign: "center",
      padding: 3,
    },
  });

  return (
    <>
      <View key={props.index}>
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
              <Text style={styles.text}>Hvordan har du fungert på dagtid?</Text>
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
                value={dagvurdering[sleepDiaryEntry.day_rating - 1 ?? 0]}
              />
              <Text style={styles.text}>
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
                <Text style={styles.text}>
                  Noter ned tidspunkt for alle blundene
                </Text>
              ) : (
                <></>
              )}
              {naps.length > 0 && hasNapped === "Ja" ? (
                naps.map((_, n) => (
                  <Card
                    style={{
                      width:
                        Dimensions.get("window").height /
                          Dimensions.get("window").width <
                        16 / 9
                          ? "70%"
                          : "70%",
                      padding: 5,
                      margin: 0,
                    }}
                    key={n}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <TimeField
                        baseDate={new Date(sleepDiaryEntry.date)}
                        style={styles.timefield}
                        onChange={(nap) => {
                          setNaps((naps) => {
                            naps[n][0] = nap;
                            return [...naps];
                          });
                          if ((naps[n][0] && naps[n][1]) !== false) {
                            //console.log(naps);
                            //@ts-ignore
                            setSleepDiaryEntry((entry) => ({
                              ...entry,
                              naps: [...naps],
                            }));
                          }
                        }}
                        //@ts-ignore
                        //Vet at hvis type er object, så er den ikke false, og dermed et date object
                        initialState={{
                          string:
                            typeof naps[n][0] !== "boolean"
                              ? "" +
                                //@ts-ignore
                                (new Date(naps[n][0]).getHours() > 10
                                  ? //@ts-ignore
                                    new Date(naps[n][0]).getHours()
                                  : //@ts-ignore
                                    "0" + new Date(naps[n][0]).getHours()) +
                                ":" +
                                //@ts-ignore
                                (new Date(naps[n][0]).getMinutes() > 10
                                  ? //@ts-ignore
                                    new Date(naps[n][0]).getMinutes()
                                  : //@ts-ignore
                                    "0" + new Date(naps[n][0]).getMinutes())
                              : "",
                          valid: true,
                        }}
                      />
                      <TimeField
                        baseDate={new Date(sleepDiaryEntry.date)}
                        style={styles.timefield}
                        onChange={(nap) => {
                          setNaps((naps) => {
                            naps[n][1] = nap;
                            return [...naps];
                          });

                          if ((naps[n][0] && naps[n][1]) !== false) {
                            //console.log(naps);
                            //@ts-ignore
                            setSleepDiaryEntry((entry) => ({
                              ...entry,
                              naps: [...naps],
                            }));
                          }
                        }}
                        //@ts-ignore
                        //Vet at hvis type er object, så er den ikke false, og dermed et date object
                        initialState={{
                          string:
                            typeof naps[n][1] !== "boolean"
                              ? "" +
                                //@ts-ignore
                                (new Date(naps[n][1]).getHours() > 10
                                  ? //@ts-ignore
                                    new Date(naps[n][1]).getHours()
                                  : //@ts-ignore
                                    "0" + new Date(naps[n][1]).getHours()) +
                                ":" +
                                //@ts-ignore
                                (new Date(naps[n][1]).getMinutes() > 10
                                  ? //@ts-ignore
                                    new Date(naps[n][1]).getMinutes()
                                  : //@ts-ignore
                                    "0" + new Date(naps[n][1]).getMinutes())
                              : "",
                          valid: true,
                        }}
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
                    //onClick={() => setSleepDiaryEntry((entry) => ({...entry, naps: [...entry.naps, [false, false]]}))}
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
              <Card
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={styles.text}>
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
                  value={sleepDiaryEntry.sleep_aides ? "Ja" : "Nei"}
                />
                {sleepDiaryEntry.sleep_aides ? (
                  <>
                    <Text style={{ color: colors.primary }}>
                      Noter medikament og dose, samt eventuelt alkoholinntak
                    </Text>
                    <TextField
                      style={{ minWidth: "100%" }}
                      value={sleepDiaryEntry.sleep_aides_detail}
                      multiline={true}
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
                <View style={styles.dateAndTimeView}>
                  <View style={{ width: "auto", justifyContent: "center" }}>
                    <Text style={{ ...styles.text }}>
                      Når gikk du til sengs? (YYYY-MM-DD)
                    </Text>
                    <DateField
                      style={styles.datefield}
                      onChange={(date) => {
                        date &&
                          setSleepTimeDate(
                            new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            )
                          );
                      }}
                      initialState={{
                        string:
                          "" +
                          sleepTimeDate.getFullYear() +
                          "-" +
                          (sleepTimeDate.getMonth() + 1 > 10
                            ? sleepTimeDate.getMonth() + 1
                            : "0" + (sleepTimeDate.getMonth() + 1)) +
                          "-" +
                          (sleepTimeDate.getDate() > 10
                            ? sleepTimeDate.getDate()
                            : "0" + sleepTimeDate.getDate()),
                        date: sleepTimeDate,
                        valid: true,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        color: colors.primary,
                        marginTop: 10,
                      }}
                    >
                      Når gikk du til sengs? (HH:MM)
                    </Text>
                    <TimeField
                      //onChange={(date) => date && setBedtime(date)}
                      style={styles.timefield}
                      onChange={(date) => {
                        if (date) {
                          setSleepDiaryEntry((entry) => ({
                            ...entry,
                            bedtime: date,
                          }));
                        } else {
                          setAllValuesAreValid(false);
                        }
                      }}
                      baseDate={sleepTimeDate}
                      initialState={{
                        string: sleepDiaryEntry.bedtime
                          ? "" +
                            (new Date(sleepDiaryEntry.bedtime).getHours() > 10
                              ? new Date(sleepDiaryEntry.bedtime).getHours()
                              : "0" +
                                new Date(sleepDiaryEntry.bedtime).getHours()) +
                            ":" +
                            (new Date(sleepDiaryEntry.bedtime).getMinutes() > 10
                              ? new Date(sleepDiaryEntry.bedtime).getMinutes()
                              : "0" +
                                new Date(sleepDiaryEntry.bedtime).getMinutes())
                          : "",
                        valid: true,
                      }}
                    />
                  </View>
                </View>
                <View style={styles.dateAndTimeView}>
                  <View>
                    <Text
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        color: colors.primary,
                        marginTop: 10,
                      }}
                    >
                      Når skrudde du av lyset? (YYYY-MM-DD)
                    </Text>
                    <DateField
                      style={styles.datefield}
                      onChange={(date) => {
                        date &&
                          setLightsOutDate(
                            new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            )
                          );
                      }}
                      initialState={{
                        string:
                          "" +
                          lightsOutDate.getFullYear() +
                          "-" +
                          (lightsOutDate.getMonth() + 1 > 10
                            ? lightsOutDate.getMonth() + 1
                            : "0" + (lightsOutDate.getMonth() + 1)) +
                          "-" +
                          (lightsOutDate.getDate() > 10
                            ? lightsOutDate.getDate()
                            : "0" + lightsOutDate.getDate()),

                        date: lightsOutDate,
                        valid: true,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        color: colors.primary,
                        marginTop: 10,
                      }}
                    >
                      Når skrudde du av lyset? (HH:MM)
                    </Text>
                    <TimeField
                      style={styles.timefield}
                      onChange={(date) => {
                        if (date) {
                          setSleepDiaryEntry((entry) => ({
                            ...entry,
                            lights_out: date,
                          }));
                        } else {
                          setAllValuesAreValid(false);
                        }
                      }}
                      initialState={{
                        string: sleepDiaryEntry.lights_out
                          ? "" +
                            (new Date(sleepDiaryEntry.lights_out).getHours() >
                            10
                              ? new Date(sleepDiaryEntry.lights_out).getHours()
                              : "0" +
                                new Date(
                                  sleepDiaryEntry.lights_out
                                ).getHours()) +
                            ":" +
                            (new Date(sleepDiaryEntry.lights_out).getMinutes() >
                            10
                              ? new Date(
                                  sleepDiaryEntry.lights_out
                                ).getMinutes()
                              : "0" +
                                new Date(
                                  sleepDiaryEntry.lights_out
                                ).getMinutes())
                          : "",
                        valid: true,
                      }}
                      baseDate={lightsOutDate}
                    />
                  </View>
                </View>

                <Text style={styles.text}>
                  Hvor mange minutter tok det fra lyset var skrudd av til du
                  sovnet?
                </Text>
                <TextField
                  style={styles.textfield}
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
                  style={styles.textfield}
                  keyboardType="numeric"
                  placeholderText="          "
                  value={numberOfNightWakes.text}
                  onChange={(e) => {
                    setNumberOfNightWakes((prev) => ({
                      ...prev,
                      text: e,
                      value: parseInt(e),
                    }));
                    console.log(sleepDiaryEntry.night_wakes);
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
                  [...Array(numberOfNightWakes.value || 0).keys()].map((n) => (
                    <Card
                      key={n}
                      style={{ maxWidth: "100%", padding: 5, margin: 0 }}
                    >
                      <TextField
                        style={styles.textfield}
                        placeholderText="          "
                        keyboardType="numeric"
                        value={
                          sleepDiaryEntry.night_wakes &&
                          sleepDiaryEntry.night_wakes[n]?.toString() !== "NaN"
                            ? sleepDiaryEntry.night_wakes[n]?.toString()
                            : ""
                        }
                        onChange={(e) => {
                          setSleepDiaryEntry((entry) => {
                            const night_wakes = [...entry.night_wakes];
                            night_wakes[n] = parseInt(e);
                            return { ...entry, night_wakes: night_wakes };
                          });
                        }}
                      />
                    </Card>
                  ))
                ) : (
                  <></>
                )}
                <Text style={styles.text}>
                  Når våknet du på morgenen uten å få sove igjen? Noter ned ditt
                  endelige oppvåkningstidspunkt.
                </Text>
                <View
                  style={{
                    flexDirection:
                      Dimensions.get("window").height /
                        Dimensions.get("window").width <
                      16 / 9
                        ? "row"
                        : "column",
                  }}
                >
                  <View>
                    <Text style={styles.text}>Skriv inn dato (YYYY-MM-DD)</Text>
                    <DateField
                      style={styles.datefield}
                      onChange={(date) => {
                        date &&
                          setWakeDate(
                            new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            )
                          );
                      }}
                      initialState={{
                        string:
                          "" +
                          wakeDate.getFullYear() +
                          "-" +
                          (wakeDate.getMonth() + 1 > 10
                            ? wakeDate.getMonth() + 1
                            : "0" + (wakeDate.getMonth() + 1)) +
                          "-" +
                          (wakeDate.getDate() > 10
                            ? wakeDate.getDate()
                            : "0" + wakeDate.getDate()),
                        date: wakeDate,
                        valid: true,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.text}>Skriv inn tidspunkt (HH:MM)</Text>
                    <TimeField
                      onChange={(date) => {
                        if (date) {
                          setSleepDiaryEntry((entry) => ({
                            ...entry,
                            waketime: date,
                          }));
                        } else {
                          setAllValuesAreValid(false);
                        }
                      }}
                      initialState={{
                        string: sleepDiaryEntry.waketime
                          ? "" +
                            (new Date(sleepDiaryEntry.waketime).getHours() > 10
                              ? new Date(sleepDiaryEntry.waketime).getHours()
                              : "0" +
                                new Date(sleepDiaryEntry.waketime).getHours()) +
                            ":" +
                            (new Date(sleepDiaryEntry.waketime).getMinutes() >
                            10
                              ? new Date(sleepDiaryEntry.waketime).getMinutes()
                              : "0" +
                                new Date(sleepDiaryEntry.waketime).getMinutes())
                          : "",
                        valid: true,
                      }}
                      baseDate={wakeDate}
                    />
                  </View>
                </View>
                <Text style={styles.text}>Når stod du opp?</Text>
                <View style={styles.dateAndTimeView}>
                  <View>
                    <Text
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        color: colors.primary,
                        marginTop: 10,
                      }}
                    >
                      Skriv inn dato (YYYY-MM-DD)
                    </Text>
                    <DateField
                      onChange={(date) => {
                        date &&
                          setRiseDate(
                            new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            )
                          );
                      }}
                      initialState={{
                        string:
                          "" +
                          riseDate.getFullYear() +
                          "-" +
                          (riseDate.getMonth() + 1 > 10
                            ? riseDate.getMonth() + 1
                            : "0" + (riseDate.getMonth() + 1)) +
                          "-" +
                          (riseDate.getDate() > 10
                            ? riseDate.getDate()
                            : "0" + riseDate.getDate()),
                        date: riseDate,
                        valid: true,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.text}>Skriv inn tidspunkt (HH:MM)</Text>
                    <TimeField
                      onChange={(date) => {
                        if (date) {
                          setSleepDiaryEntry((entry) => ({
                            ...entry,
                            risetime: date,
                          }));
                        } else {
                          setAllValuesAreValid(false);
                        }
                      }}
                      initialState={{
                        string: sleepDiaryEntry.risetime
                          ? "" +
                            (new Date(sleepDiaryEntry.risetime).getHours() > 10
                              ? new Date(sleepDiaryEntry.risetime).getHours()
                              : "0" +
                                new Date(sleepDiaryEntry.risetime).getHours()) +
                            ":" +
                            (new Date(sleepDiaryEntry.risetime).getMinutes() >
                            10
                              ? new Date(sleepDiaryEntry.risetime).getMinutes()
                              : "0" +
                                new Date(sleepDiaryEntry.risetime).getMinutes())
                          : "",
                        valid: true,
                      }}
                      baseDate={riseDate}
                    />
                  </View>
                </View>
                <Text style={styles.text}>Hvor dyp var søvnen din i natt?</Text>
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
                  value={søvnvurdering[sleepDiaryEntry.sleep_quality - 1]}
                />
                <Text style={styles.text}>Notater</Text>
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
                  onClick={() => postEntry()}
                  disabled={!allValuesAreValid}
                >
                  <Text style={styles.savebutton}>
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
