import { PageTemplate } from "../material/PageTemplate";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { gender, User } from "../../types/Types";
import { AuthContext } from "../../auth/AuthProvider";
import { updateProfile } from "../../api/userApi";
import { useRecoilState } from "recoil";
import {
  cachedModules,
  cachedSleepDiary,
  loggedInUser,
} from "../../state/atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../styles/styles";
import { Alert } from "../material/Alert";
import { Card } from "../material/Card";
import { Button } from "../material/Button";
import { TextField } from "../material/TextField";
import {
  storeCachedModules,
  storeProgression,
} from "../../state/StorageController";
import { Select } from "../material/Select";

export function ProfilePage() {
  const [thisUser, setThisUser] = useRecoilState(loggedInUser);
  const [, setSleepDiary] = useRecoilState(cachedSleepDiary);
  const [, setModules] = useRecoilState(cachedModules);
  const { session, setSession } = useContext(AuthContext);
  const [openAlert, setOpenAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState<User>(
    thisUser ?? {
      email: "",
      name: "",
      dateOfBirth: "",
      gender: "undefined",
      occupation: "",
      relationshipStatus: "undefined",
    }
  );

  const style = StyleSheet.create({
    fieldDescriptions: {
      textTransform: "uppercase",
      fontSize: 12,
      color: colors.text_secondary,
    },
  });

  async function logOut() {
    setThisUser(undefined);
    await AsyncStorage.removeItem("Local_user");
    setSleepDiary(undefined);
    await AsyncStorage.removeItem("SleepDiary");
    await AsyncStorage.removeItem("Progression");
    setModules([]);
    await storeCachedModules([]);
    await AsyncStorage.removeItem("ModuleIds");
    await storeProgression([]);
    await AsyncStorage.removeItem("Restriction");
    //@ts-ignore
    setSession({ session_token: undefined, session: undefined });
  }

  const genders = {
    male: "Mann",
    female: "Kvinne",
    other: "Annet",
    undefined: "-",
  };

  const dateRegex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/;

  return (
    <PageTemplate>
      <Card style={{ margin: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.text_white,
                fontSize: 24,
                marginBottom: 15,
              }}
            >
              Din Profil:
            </Text>
            <Button
              variant="contained"
              style={{ width: 100 }}
              onClick={() => setEdit(!edit)}
            >
              {!edit ? <Text>Endre</Text> : <Text>Avbryt</Text>}
            </Button>
          </View>
          {thisUser ? (
            <View>
              <Text style={style.fieldDescriptions}>Epost</Text>
              <TextField
                editable={false}
                value={user.email}
                onChange={(arg: string) => {
                  setUser((prev) => ({ ...prev, email: arg }));
                }}
              />
              <Text style={style.fieldDescriptions}>Navn</Text>
              <TextField
                value={user.name}
                editable={edit}
                onChange={(arg: string) => {
                  setUser((prev) => ({ ...prev, name: arg }));
                }}
              />
              <Text style={style.fieldDescriptions}>Fødselsdato</Text>
              <TextField
                editable={edit}
                value={user.dateOfBirth}
                error={!dateRegex.test(user.dateOfBirth)}
                onChange={(arg: string) => {
                  setUser((prev) => ({ ...prev, dateOfBirth: arg }));
                }}
              />
              <Text style={style.fieldDescriptions}>Kjønn</Text>
              <Select
                editable={edit}
                options={Object.entries(genders).map(([k, v]) => ({
                  value: k,
                  label: v,
                }))}
                optionDisplay={(o) => o.label}
                value={{ value: user.gender, label: genders[user.gender] }}
                onChange={(o: { value: gender; label: string }) => {
                  setUser((prev) => ({ ...prev, gender: o.value }));
                }}
              />
              <Text style={style.fieldDescriptions}>Yrke</Text>
              <TextField
                editable={edit}
                value={user.occupation}
                onChange={(arg: string) => {
                  setUser((prev) => ({ ...prev, occupation: arg }));
                }}
              />
            </View>
          ) : (
            <View />
          )}
        </View>
        {edit ? (
          <Button
            variant="contained"
            onClick={() => {
              if (session?.identity.id) {
                setThisUser(user);
                updateProfile(user, session?.identity.id);
                setEdit(false);
              }
            }}
          >
            <Text style={{ fontSize: 18 }}>Lagre</Text>
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              logOut();
            }}
          >
            <Text style={{ fontSize: 18 }}>Logg ut</Text>
          </Button>
        )}
      </Card>

      <View style={{ height: 80, width: "100%" }} />
      <Alert
        type={"alert"}
        content={
          "Klarte ikke å hente test, dette kan skyldes mangel på internett, eller mangel på kompetanse fra vår side"
        }
        open={openAlert}
        setOpen={setOpenAlert}
      />
    </PageTemplate>
  );
}
