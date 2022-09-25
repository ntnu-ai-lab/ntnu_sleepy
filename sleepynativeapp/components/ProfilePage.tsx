import { PageTemplate } from "./PageTemplate";
import React, { useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { TextField } from "./material/TextField";
import { Card } from "./material/Card";
import { relationshipStatus, UserEx } from "../types/Types";
import { gender } from "../types/Types";
import { Select } from "./material/Select";
import { NavBar } from "./material/NavBar";
import { ProgressBar } from "./material/ProgressBar";
import { AuthContext } from "../auth/AuthProvider";
import { Button } from "./material/Button";
import { getTest } from "../api/userApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUser } from "../state/atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ProfilePage() {
  const [state, setState] = useState(UserEx);
  const [thisUser] = useRecoilState(loggedInUser);
  const { sessionToken, session, setSession } = useContext(AuthContext);

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
      <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
        <Card style={{ padding: 20 }}>
          <Text style={{ color: "white" }}>Email</Text>
          <TextField
            editable={false}
            value={state.email}
            onChange={onEmailChange}
            placeholderText={state.email}
          />
          <Text style={{ color: "white" }}>Navn</Text>
          <TextField
            value={thisUser ? thisUser.name : "Logg inn på nytt"}
            editable={false}
          />
          <Text style={{ color: "white" }}>Fødselsdato</Text>
          <TextField
            editable={false}
            value={state.dateOfBirth}
            onChange={onDateOfBirthChange}
            placeholderText={state.dateOfBirth}
          />
          <Text style={{ color: "white" }}>Kjønn</Text>
          <Select
            value={state.gender}
            onChange={onGenderChange}
            placeholderText={state.gender}
            options={["male", "female", "other"]}
            optionDisplay={(arg: gender) => {
              if (arg === "male") return "Mann";
              else if (arg === "female") return "Kvinne";
              else return "Annet";
            }}
          />
          <Text style={{ color: "white" }}>Yrke</Text>
          <TextField
            editable={false}
            value={state.occupation}
            onChange={onOccupationChange}
            placeholderText={state.occupation}
          />
          <Text style={{ color: "white" }}>Sivilstatus</Text>
          <Select
            value={state.relationshipStatus}
            onChange={onRelationshipStatusChange}
            placeholderText={state.relationshipStatus}
            options={["married", "coliving", "relationship", "single"]}
            optionDisplay={(arg: relationshipStatus) => {
              if (arg === "married") return "Gift";
              if (arg === "coliving") return "Samboer";
              if (arg === "relationship") return "Fast forhold";
              return "Single";
            }}
          />
          <Button variant="contained" onClick={logOut}>
            <Text>Logg ut</Text>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (sessionToken && session)
                getTest(session.identity.id, sessionToken);
            }}
          >
            <Text>Test</Text>
          </Button>
        </Card>
        <View style={{ height: 80, width: "100%" }} />
      </ScrollView>
    </PageTemplate>
  );
}
