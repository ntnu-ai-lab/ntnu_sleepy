import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
  SubmitSelfServiceRegistrationFlowWithPasswordMethodBody,
} from "@ory/kratos-client";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import { createUser } from "../../api/userApi";
import { AuthContext } from "../../auth/AuthProvider";
import { handleFormSubmitError } from "../../auth/form";
import { ProjectContext } from "../../auth/ProjectProvider";
import { newKratosSdk } from "../../auth/Sdk";
import { User, gender, relationshipStatus } from "../../types/Types";
import { PageTemplate } from "../material/PageTemplate";
import { colors } from "../../styles/styles";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { TextField } from "../material/TextField";
import { Select } from "../material/Select";
import { IconButton } from "../material/IconButton";
import ArrowBack from "../../assets/arrowBack.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../../state/atoms";
import { DateField } from "../material/DateField";

export function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [occupation, setOccupation] = useState<string>("");
  const [checked, setChecked] = useState<"checked" | "unchecked">("unchecked");
  const [, setThisUser] = useRecoilState(loggedInUser);
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const navigation = useNavigation();

  const genders = {
    male: "Mann",
    female: "Kvinne",
    other: "Annet",
    undefined: "-",
  };
  const relationshipStatuses = {
    married: "Gift",
    coliving: "Samboer",
    relationship: "Fast forhold",
    single: "Singel",
    undefined: "-",
  };

  const [gender, setGender] = useState<gender>("undefined");
  const [relationship, setRelationship] =
    useState<relationshipStatus>("undefined");

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const cardHeight = Dimensions.get("window").height * 0.8;

  function passwordMatch() {
    if (!password2) return true;
    else if (password === password2) return true;
    return false;
  }

  function dateToIsoDate(date: string): string {
    return `${date.slice(4)}-${date.slice(2, 4)}-${date.slice(0, 2)}`;
  }

  const [flow, setConfig] = useState<SelfServiceRegistrationFlow | undefined>(
    undefined
  );
  const { project } = useContext(ProjectContext);
  const { setSession, isAuthenticated, sessionToken, session } =
    useContext(AuthContext);

  const initializeFlow = () => {
    newKratosSdk(project)
      .initializeSelfServiceRegistrationFlowWithoutBrowser()
      // The flow was initialized successfully, let's set the form data:
      .then(({ data: flow }) => {
        setConfig(flow);
      })
      .catch(console.error);
  };

  // When the component is mounted, we initialize a new use login flow:
  useFocusEffect(
    React.useCallback(() => {
      initializeFlow();

      return () => {
        setConfig(undefined);
      };
    }, [project])
  );

  // This will update the registration flow with the user provided input:
  const onSubmit = (
    payload: SubmitSelfServiceRegistrationFlowBody
  ): Promise<void> =>
    flow
      ? newKratosSdk(project)
          .submitSelfServiceRegistrationFlow(flow.id, payload)
          .then(({ data }) => {
            // ORY Kratos can be configured in such a way that it requires a login after
            // registration. You could handle that case by navigating to the Login screen
            // but for simplicity we'll just print an error here:
            if (!data.session_token || !data.session) {
              const err = new Error(
                "It looks like you configured ORY Kratos to not issue a session automatically after registration. This edge-case is currently not supported in this example app. You can find more information on enabling this feature here: https://www.ory.sh/kratos/docs/next/self-service/flows/user-registration#successful-registration"
              );
              return Promise.reject(err);
            }

            // Looks like we got a session!
            return Promise.resolve({
              session: data.session,
              session_token: data.session_token,
            });
          })
          // Let's log the user in!
          .then((s) => {
            setSession(s);
            const user: User = {
              name: name,
              email: email,
              username: email,
              dateOfBirth: dateOfBirth.toISOString(),
              gender: gender,
              occupation: occupation,
              relationshipStatus: relationship,
            };
            createUser(user, s.session.identity.id).then((r) => {
              if (r) setThisUser(r);
            }); //@ts-ignore
            navigation.navigate("home");
          })
          .catch(
            handleFormSubmitError<SelfServiceRegistrationFlow | undefined>(
              setConfig,
              initializeFlow
            )
          )
      : Promise.resolve();

  return (
    <PageTemplate style={{ paddingTop: 60, paddingBottom: 100 }}>
      <View style={{ position: "absolute", top: 60, left: 10, zIndex: 10000 }}>
        <IconButton onClick={navigation.goBack}>
          <ArrowBack />
        </IconButton>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 24, alignSelf: "center" }}>
          Registrer ny bruker
        </Text>
      </View>
      <Card style={{ alignSelf: "center", width: "95%", height: cardHeight }}>
        <View>
          <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            enableAutomaticScroll={true}
            enableResetScrollToCoords={false}
            extraScrollHeight={50}
            enableOnAndroid={true}
            style={{ height: cardHeight - 85 }}
          >
            <TextField
              value={name}
              onChange={setName}
              placeholderText="Fullt navn"
              style={{ marginBottom: 10 }}
            />
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e);
                setValidEmail(!emailRegex.test(e));
              }}
              error={validEmail}
              placeholderText="E-postadresse"
              style={{ marginBottom: 10 }}
            />
            <TextField
              value={password}
              onChange={setPassword}
              placeholderText="Passord"
              password={true}
              style={{ marginBottom: 10 }}
            />
            <TextField
              value={password2}
              onChange={setPassword2}
              placeholderText="Oppgi passord på nytt"
              password={true}
              error={!passwordMatch()}
              style={{ marginBottom: 10 }}
            />
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text_white,
                  textTransform: "uppercase",
                }}
              >
                Sivilstatus
              </Text>
            </View>
            <View>
              <Select
                options={Object.entries(relationshipStatuses).map(([k, v]) => ({
                  value: k,
                  label: v,
                }))}
                optionDisplay={(o) => o.label}
                onChange={(o: { value: relationshipStatus; label: string }) =>
                  o && setRelationship(o.value)
                }
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text_white,
                  textTransform: "uppercase",
                }}
              >
                Kjønn
              </Text>
            </View>
            <View>
              <Select
                options={Object.entries(genders).map(([k, v]) => ({
                  value: k,
                  label: v,
                }))}
                optionDisplay={(o) => o.label}
                onChange={(o: { value: gender; label: string }) =>
                  o && setGender(o.value)
                }
              />
            </View>

            <DateField
              onChange={(date) => {
                date &&
                  setDateOfBirth(
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
                  dateOfBirth.getFullYear() +
                  "-" +
                  (dateOfBirth.getMonth() + 1) +
                  "-" +
                  dateOfBirth.getDate(),
                date: dateOfBirth ?? undefined,
                valid: true,
              }}
            />
            <TextField
              value={occupation}
              onChange={setOccupation}
              style={{ marginBottom: 10 }}
              placeholderText="Yrke"
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#00000064",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <View style={{ width: "80%" }}>
                <Text style={{ color: colors.text_white }}>
                  Jeg samtykker til å delta i prosjektet og til at mine
                  personopplysninger brukes slik det er beskrevet i{" "}
                  <TouchableWithoutFeedback
                    onPress={() => {
                      //@ts-ignore
                      navigation.navigate("consent");
                    }}
                  >
                    <Text
                      style={{
                        color: "#7094DB",
                        textDecorationLine: "underline",
                      }}
                    >
                      samtykkeskjemaet.
                    </Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  width: 38,
                  height: 38,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  status={checked}
                  onPress={() => {
                    if (checked === "checked") setChecked("unchecked");
                    else setChecked("checked");
                  }}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={{ height: 80 }}>
          <Button
            variant="contained"
            onClick={() => {
              const userInput: SubmitSelfServiceRegistrationFlowWithPasswordMethodBody =
                {
                  method: "password",
                  password: password,
                  traits: { email: email },
                };
              onSubmit(userInput);
            }}
          >
            <Text style={{ fontSize: 18 }}>Registrer</Text>
          </Button>
        </View>
      </Card>
    </PageTemplate>
  );
}
