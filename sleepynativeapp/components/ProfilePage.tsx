import { PageTemplate } from "./PageTemplate";
import React, { useContext, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { TextField } from "./material/TextField";
//import { Card } from "./material/Card";
import { relationshipStatus, UserEx } from "../types/Types";
import { gender } from "../types/Types";
import { Select } from "./material/Select";
import { NavBar } from "./material/NavBar";
import { ProgressBar } from "./material/ProgressBar";
import { AuthContext } from "../auth/AuthProvider";
//import { Button } from "./material/Button";
import { getTest } from "../api/userApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUser } from "../state/atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Divider,
  List,
} from "react-native-paper";
import { colors } from "../styles/styles";
import SelectDropdown from "react-native-select-dropdown";

export function ProfilePage() {
  const [state, setState] = useState(UserEx);
  const [thisUser] = useRecoilState(loggedInUser);
  const { sessionToken, session, setSession } = useContext(AuthContext);

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  const genders = { male: "Mann", female: "Kvinne", other: "Annet" };
  const relationshipStatuses = {
    married: "Gift",
    coliving: "Samboer",
    relationship: "Fast forhold",
    single: "Singel",
  };
  const [gender, setGender] = useState<string>(UserEx.gender);
  const [relationship, setRelationship] = useState<string>(
    UserEx.relationshipStatus
  );

  const onEmailChange = (arg: string) =>
    setState((prev) => ({
      ...prev,
      email: arg,
    }));

  const onPasswordChange = (arg: string) =>
    setState((prev) => ({
      ...prev,
      password: arg,
    }));

  const onGenderChange = (arg: string) =>
    setState((prev) => ({
      ...prev,
      gender: arg as gender,
    }));

  const onOccupationChange = (arg: string) =>
    setState((prev) => ({
      ...prev,
      occupation: arg,
    }));

  const onNameChange = (arg: string) =>
    setState((prev) => ({
      ...prev,
      name: arg,
    }));

  const onDateOfBirthChange = (arg: string) =>
    setState((prev) => ({
      ...prev,
      dateOfBirth: arg,
    }));

  const onRelationshipStatusChange = (arg: string) =>
    setState((prev) => ({
      ...prev,
      relationshipStatus: arg as relationshipStatus,
    }));

  function logOut() {
    //@ts-ignore
    setSession({ session_token: undefined, session: undefined });

    const removeUserFromStorage = async () => {
      try {
        await AsyncStorage.removeItem("Local_user");
      } catch (e) {
        console.error;
      }
    };
    removeUserFromStorage();
  }

  return (
    <PageTemplate>
      <Card style={{ margin: 10 }}>
        <Card.Actions style={{ alignSelf: "center", marginBottom: 10 }}>
          <ScrollView
            style={{ width: "100%" }}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={false}
            endFillColor={colors.primary_dark}
            scrollToOverflowEnabled={true}
          >
            <Divider style={{ margin: 5 }} />
            <TextInput
              editable={false}
              value={state.email}
              onChangeText={onEmailChange}
              placeholder={state.email}
              label="Epostadresse"
              mode="outlined"
            />
            <Divider style={{ margin: 5 }} />
            <TextInput
              value={thisUser ? thisUser.name : "Logg inn på nytt"}
              editable={false}
              label="Navn"
              mode="outlined"
              onChangeText={onNameChange}
            />
            <Divider style={{ margin: 5 }} />
            <TextInput
              editable={false}
              value={state.dateOfBirth}
              onChangeText={onDateOfBirthChange}
              placeholder={state.dateOfBirth}
              label="Fødselsdato"
              mode="outlined"
            />
            <Divider style={{ margin: 5 }} />

            {/* <Select
              value={state.gender}
              onChange={onGenderChange}
              placeholderText={state.gender}
              options={["male", "female", "other"]}
              optionDisplay={(arg: gender) => {
                if (arg === "male") return "Mann";
                else if (arg === "female") return "Kvinne";
                else return "Annet";
              }}
            /> */}

            <SelectDropdown
              defaultButtonText={genders[UserEx.gender]}
              selectedRowStyle={{ backgroundColor: colors.primary_dark }}
              defaultValue={genders[UserEx.gender]}
              buttonStyle={{ width: "100%", borderRadius: 10 }}
              buttonTextStyle={{ textAlign: "left" }}
              dropdownStyle={{ width: "90%", borderRadius: 10 }}
              data={[genders.male, genders.female, genders.other]}
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

            <Divider style={{ margin: 5 }} />

            <SelectDropdown
              defaultButtonText={
                relationshipStatuses[UserEx.relationshipStatus]
              }
              selectedRowStyle={{ backgroundColor: colors.primary_dark }}
              defaultValue={relationshipStatuses[UserEx.relationshipStatus]}
              buttonStyle={{ width: "100%", borderRadius: 10 }}
              buttonTextStyle={{ textAlign: "left" }}
              dropdownStyle={{ width: "90%", borderRadius: 10 }}
              data={[
                relationshipStatuses.married,
                relationshipStatuses.coliving,
                relationshipStatuses.relationship,
                relationshipStatuses.single,
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
            <Divider style={{ margin: 5 }} />

            {/* <Select
              value={state.relationshipStatus}
              onChange={onRelationshipStatusChange}
              placeholderText={state.relationshipStatus}
              options={["married", "coliving", "relationship", "single"]}
              optionDisplay={(arg: relationshipStatus) => {
                if (arg === "married") return "Gift";
                if (arg === "coliving") return "Samboer";
                if (arg === "relationship") return "Fast forhold";
                return "Singel";
              }}
            /> */}
            <TextInput
              editable={false}
              value={state.occupation}
              onChangeText={onOccupationChange}
              placeholder={state.occupation}
              label="Yrke"
              mode="outlined"
            />
          </ScrollView>
        </Card.Actions>
        <Button mode="text" onPress={logOut}>
          <Text>Logg ut</Text>
        </Button>
        <Button
          mode="text"
          onPress={() => {
            if (sessionToken && session)
              getTest(session.identity.id, sessionToken);
          }}
        >
          <Text>Test</Text>
        </Button>
      </Card>

      <View style={{ height: 80, width: "100%" }} />
    </PageTemplate>
  );
}
