import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
  SubmitSelfServiceRegistrationFlowWithPasswordMethodBody,
} from "@ory/kratos-client";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { createUser } from "../api/userApi";
import { AuthContext } from "../auth/AuthProvider";
import { handleFormSubmitError } from "../auth/form";
import { ProjectContext } from "../auth/ProjectProvider";
import { newKratosSdk } from "../auth/Sdk";
import { User, gender, relationshipStatus } from "../types/Types";
import { colors } from "../styles/styles";
//import { Button } from "./material/Button";
//import { Card } from "./material/Card";
import { Select } from "./material/Select";
import { TextField } from "./material/TextField";
import { PageTemplate } from "./PageTemplate";
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Divider,
} from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");

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

  function passwordMatch() {
    if (!password2) return true;
    else if (password === password2) return true;
    return false;
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

  /*
  useEffect(() => {
    if (isAuthenticated && sessionToken && session) {
      console.log("Opprette bruker i django");
      const user: DjangoUser = {
        name: name,
      };
      createUser(user, session.identity.id, sessionToken); //@ts-ignore
      navigation.navigate("profile");
    }
  }, [isAuthenticated]);
  */

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
            dateOfBirth: dateOfBirth,
            gender: gender,
            occupation: occupation,
            relationshipStatus: relationship,
          };
          createUser(user, s.session.identity.id); //@ts-ignore
          navigation.navigate("profile");
        })
        .catch(
          handleFormSubmitError<SelfServiceRegistrationFlow | undefined>(
            setConfig,
            initializeFlow
          )
        )
      : Promise.resolve();

  return (
    <PageTemplate style={{ paddingTop: 60 }}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 24, alignSelf: "center" }}>
          Registrer ny bruker
        </Text>
      </View>
      <Card style={{ alignSelf: "center" }}>
        <Card.Actions style={{ alignSelf: "center", marginBottom: 10 }}>
          <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            enableAutomaticScroll={true}
            enableResetScrollToCoords={false}
            enableOnAndroid={true}
            style={{ width: "90%" }}
          >
            <TextInput
              value={name}
              onChangeText={setName}
              label="Fullt navn"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              label="E-postadresse"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              label="Passord"
              secureTextEntry={true}
              style={{ marginBottom: 10 }}
            />
            <TextInput
              value={password2}
              onChangeText={setPassword2}
              label="Oppgi passord på nytt"
              secureTextEntry={true}
              error={!passwordMatch()}
              style={{ marginBottom: 10 }}
            />
            <Card.Actions>
              <Text>Sivilstatus</Text>
            </Card.Actions>
            <Card.Content
            >
              <SelectDropdown
                defaultButtonText={"Velg et alternativ"}
                selectedRowStyle={{ backgroundColor: colors.primary_dark }}
                //defaultValue={}
                buttonStyle={{ width: "100%", borderRadius: 10 }}
                buttonTextStyle={{ textAlign: "center" }}
                dropdownStyle={{ width: "90%", borderRadius: 10, justifyContent: 'center' }}
                data={[
                  relationshipStatuses.married,
                  relationshipStatuses.coliving,
                  relationshipStatuses.relationship,
                  relationshipStatuses.single,
                  relationshipStatuses.undefined,
                ]}
                onSelect={(selectedItem, index) => {
                  //console.log(selectedItem, index);
                  setRelationship(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </Card.Content>
            <Card.Actions>
              <Text>Kjønn</Text>
            </Card.Actions>
            <Card.Content>
              <SelectDropdown
                defaultButtonText={"Velg et alternativ"}
                selectedRowStyle={{ backgroundColor: colors.primary_dark }}
                defaultValue={"undefined"}
                buttonStyle={{ width: "100%", borderRadius: 10 }}
                buttonTextStyle={{ textAlign: "center" }}
                dropdownStyle={{
                  width: "90%",
                  borderRadius: 10,
                }}
                data={[
                  genders.male,
                  genders.female,
                  genders.other,
                  genders.undefined,
                ]}
                onSelect={(selectedItem, index) => {
                  //console.log(selectedItem, index);
                  setGender(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </Card.Content>
            <Divider style={{ margin: 5 }} />

            <TextInput
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              style={{ marginBottom: 10 }}
              label="Fødselsdato på format: ddmmåååå"
            />
            <TextInput
              value={occupation}
              onChangeText={setOccupation}
              style={{ marginBottom: 10 }}
              label="Yrke"
            />
          </KeyboardAwareScrollView>
        </Card.Actions>

        <Button
          style={{ width: "50%", alignSelf: "center" }}
          onPress={() => {
            const userInput: SubmitSelfServiceRegistrationFlowWithPasswordMethodBody =
            {
              method: "password",
              password: password,
              traits: { email: email },
            };
            onSubmit(userInput);
          }}
        >
          <Text style={{ fontSize: 20 }}>Registrer</Text>
        </Button>
      </Card>
    </PageTemplate>
  );
}
