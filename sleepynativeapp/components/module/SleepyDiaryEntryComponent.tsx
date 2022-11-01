import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
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
    console.log(sleepDiaryEntry, props.sleepDiaryID);
    if (
      props.sleepDiaryID &&
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
      const entryResult = await finishDiaryEntry(storedSleepDiary.id, rest)
        .then((entry) => {
          if (entry) {
            console.log("Result", entry);
            const tempEntries = [...storedSleepDiary.diary_entries];
            tempEntries.push(entry);
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
      props.sleepDiaryID &&
      sleepDiaryEntry &&
      sleepDiaryEntry.bedtime &&
      sleepDiaryEntry.lights_out &&
      sleepDiaryEntry.time_to_sleep !== (null || undefined) &&
      sleepDiaryEntry.waketime &&
      sleepDiaryEntry.risetime &&
      sleepDiaryEntry.sleep_quality
    ) {
      setAllValuesAreValid(true);
    } else {
      setAllValuesAreValid(false);
    }
    //console.log(sleepDiaryEntry);
  }, [sleepDiaryEntry]);

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
                  <Card
                    style={{ maxWidth: "70%", padding: 5, margin: 0 }}
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
                                new Date(naps[n][0]).getHours() +
                                ":" +
                                //@ts-ignore
                                new Date(naps[n][0]).getMinutes()
                              : "",
                          valid: true,
                        }}
                      />
                      <TimeField
                        baseDate={new Date(sleepDiaryEntry.date)}
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
                            typeof naps[n][0] !== "boolean"
                              ? "" +
                                //@ts-ignore
                                new Date(naps[n][0]).getHours() +
                                ":" +
                                //@ts-ignore
                                new Date(naps[n][0]).getMinutes()
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

                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        color: colors.primary,
                        marginTop: 10,
                      }}
                    >
                      Når gikk du til sengs? (YYYY-MM-DD)
                    </Text>
                    <DateField
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
                          (sleepTimeDate.getMonth() + 1) +
                          "-" +
                          sleepTimeDate.getDate(),
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
                            new Date(sleepDiaryEntry.bedtime).getHours() +
                            ":" +
                            new Date(sleepDiaryEntry.bedtime).getMinutes()
                          : "",
                        valid: true,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
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
                          (lightsOutDate.getMonth() + 1) +
                          "-" +
                          lightsOutDate.getDate(),
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
                            new Date(sleepDiaryEntry.lights_out).getHours() +
                            ":" +
                            new Date(sleepDiaryEntry.lights_out).getMinutes()
                          : "",
                        valid: true,
                      }}
                      baseDate={lightsOutDate}
                    />
                  </View>
                </View>

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
                        style={{
                          minWidth: "30%",
                          alignText: "center",
                          alignItems: "center",
                        }}
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
                <View style={{ flexDirection: "row" }}>
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
                          (wakeDate.getMonth() + 1) +
                          "-" +
                          wakeDate.getDate(),
                        date: wakeDate,
                        valid: true,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        alignItems: "center",
                        color: colors.primary,
                        marginTop: 10,
                      }}
                    >
                      Skriv inn tidspunkt (HH:MM)
                    </Text>
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
                            new Date(sleepDiaryEntry.waketime).getHours() +
                            ":" +
                            new Date(sleepDiaryEntry.waketime).getMinutes()
                          : "",
                        valid: true,
                      }}
                      baseDate={wakeDate}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    alignItems: "center",
                    color: colors.primary,
                    marginTop: 10,
                  }}
                >
                  Når stod du opp?
                </Text>
                <View style={{ flexDirection: "row" }}>
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
                          (riseDate.getMonth() + 1) +
                          "-" +
                          riseDate.getDate(),
                        date: riseDate,
                        valid: true,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        alignItems: "center",
                        minWidth: "30%",
                        color: colors.primary,
                        marginTop: 10,
                      }}
                    >
                      Skriv inn tidspunkt (HH:MM)
                    </Text>
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
                            new Date(sleepDiaryEntry.risetime).getHours() +
                            ":" +
                            new Date(sleepDiaryEntry.risetime).getMinutes()
                          : "",
                        valid: true,
                      }}
                      baseDate={riseDate}
                    />
                  </View>
                </View>
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
                  value={søvnvurdering[sleepDiaryEntry.sleep_quality - 1]}
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
                  onClick={() => postEntry()}
                  disabled={!allValuesAreValid}
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
