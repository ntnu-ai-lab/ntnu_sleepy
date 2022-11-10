import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useRecoilState } from "recoil";
import {
  changeRiseTimeSleepRestriction,
  getSleepRestriction,
  startSleepRestriction,
} from "../../api/sleepRestrictionApi";
import { mySleepRestriction } from "../../state/atoms";
import { colors } from "../../styles/styles";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { PageTemplate } from "../material/PageTemplate";
import { ProgressBar } from "../material/ProgressBar";
import { TextField } from "../material/TextField";

export function SleepRestrictionPage() {
  const [restriction, setRestriction] = useRecoilState(mySleepRestriction);
  const [create, setCreate] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [riseTime, setRiseTime] = useState<string>("");

  async function getOrStartSleepRestriction() {
    getSleepRestriction().then((r) => {
      if (r === undefined) {
        setCreate(true);
      } else {
        setRestriction(r);
      }
    });
  }

  function beginSleepRestriction() {
    const newRiseTime = riseTime.replace(".", ":");
    /** Dette er hva som skal fungere på sikt  */
    startSleepRestriction(newRiseTime).then((r) => {
      if (r) {
        setCreate(false);
        setRiseTime("");
        setRestriction(r);
      }
    });
  }

  const timeRegex = /^([0-1]?[0-9]|2[0-3]).[0-5][0-9]$/;

  useEffect(() => {
    getOrStartSleepRestriction();
  }, []);

  const styles = StyleSheet.create({
    subHeader: {
      fontSize: 18,
      color: colors.text_white,
    },
    Heading: {
      fontSize: 24,
      color: colors.text_white,
      alignSelf: "center",
      marginBottom: 20,
      marginTop: 10,
    },
    description: {
      color: colors.text_white,
    },
    bodyText: {
      color: `${colors.text_white}E0`,
      marginBottom: 5,
    },
  });

  function durationToHM() {
    const duration = restriction?.duration.split(":");
    let durationString: string = "";
    if (duration) {
      durationString += parseInt(duration[0]).toString() + " timer og ";
      durationString += parseInt(duration[1]).toString() + " min.";
    }
    return durationString;
  }

  function getProgress() {
    if (restriction) {
      const today = new Date();
      const startDate = new Date(restriction.week);
      const differenceInMS = today.getTime() - startDate.getTime();
      const MSInADay = 86400000;
      const progressInDays = Math.floor(differenceInMS / MSInADay);
      return progressInDays;
    }
    return 0
  }

  return (
    <PageTemplate>
      <View>
        {create ? (
          <View>
            <Card>
              <Text style={styles.Heading}>Start Søvnrestriksjon</Text>
              <Text style={styles.bodyText}>
                Søvnrestriksjon beregnes basert på hva du har ført i
                søvndagboken, og vil bli oppdatert hver uke. For å starte
                trenger du kun å skrive inn når du opp hver dag. Dette kan også
                endre senere.
              </Text>
              <Text style={styles.bodyText}>
                For at søvnrestriksjonen skal oppdatere seg riktig er det viktig
                at du fortsetter å fører søvndagbok
              </Text>
              <Text style={styles.description}>Når må du stå opp?</Text>
              <TextField
                value={riseTime}
                onChange={setRiseTime}
                keyboardType={"numeric"}
                placeholderText={"HH.MM"}
                error={!timeRegex.test(riseTime)}
              />
              <Button variant="outlined" onClick={beginSleepRestriction}>
                <Text style={styles.subHeader}>Start</Text>
              </Button>
            </Card>
          </View>
        ) : (
          <View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ marginHorizontal: 10 }}>
                <ProgressBar percentage={getProgress()} />
              </View>
              <Card>
                <View
                  style={{
                    height: Dimensions.get("window").height * 0.5,
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View style={{ marginBottom: 20 }}>
                      <Text style={styles.Heading}>Søvn plan</Text>
                      <Text style={[styles.subHeader, { marginBottom: 10 }]}>
                        Tid i senga: {durationToHM()}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 10,
                        }}
                      >
                        <Text style={styles.subHeader}>
                          Leggetid: {restriction?.bedtime.slice(0, -3)}
                        </Text>
                        <Text style={styles.subHeader}>
                          Stå opp: {restriction?.custom_rise_time.slice(0, -3)}
                        </Text>
                      </View>
                      <Text style={styles.bodyText}>
                        For å få mest ut av planen er det vikitg å holde en fast
                        rytme, så prøv å hold både leggetid og når du står opp i
                        helgene også.
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.subHeader}>Effektivitet: </Text>
                      <Text style={styles.bodyText}>
                        Din effektivitet blir beregnet ut i fra søvndagboken du
                        fører. Den vil bli oppdatert hver dag du fører
                        søvndagbok, og brukes til å beregne neste
                        søvnrestriksjons periode.
                      </Text>
                    </View>
                  </View>
                  <View>
                    {edit ? (
                      <View>
                        <TextField
                          value={riseTime}
                          onChange={setRiseTime}
                          keyboardType={"numeric"}
                          placeholderText={"HH.MM"}
                          error={!timeRegex.test(riseTime)}
                        />
                        <Button
                          variant="contained"
                          onClick={() => {
                            const newRiseTime = riseTime.replace(".", ":");
                            changeRiseTimeSleepRestriction(
                              newRiseTime,
                              restriction.id
                            ).then((r) => {
                              if (r) {
                                setEdit(false);
                                setRiseTime("");
                                setRestriction(r);
                              }
                            });
                          }}
                        >
                          <Text>Oppdater</Text>
                        </Button>
                      </View>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => {
                          setEdit(true);
                        }}
                      >
                        <Text>Endre når du skal stå opp</Text>
                      </Button>
                    )}
                  </View>
                </View>
              </Card>
            </View>
          </View>
        )}
      </View>
    </PageTemplate>
  );
}
