import { PageTemplate } from "../material/PageTemplate";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { User, UserEx } from "../../types/Types";
import { AuthContext } from "../../auth/AuthProvider";
import { createUser, getUserByIdentiyId } from "../../api/userApi";
import { useRecoilState } from "recoil";
import { cachedSleepDiary, loggedInUser } from "../../state/atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "../material/Alert";
import { Card } from "../material/Card";
import { Button } from "../material/Button";
import { TextField } from "../material/TextField";
import {
  storeCachedModules,
  storeLocalUser,
  storeModuleIds,
  storeProgression,
  storeSleepDiary,
  storeSleepRestriction,
} from "../../state/StorageController";

export function ProfilePage() {
  const [thisUser, setThisUser] = useRecoilState(loggedInUser);
  const [, setSleepDiary] = useRecoilState(cachedSleepDiary);
  const [, setModules] = useRecoilState(cachedSleepDiary);
  const { sessionToken, session, setSession } = useContext(AuthContext);
  const navigation = useNavigation();
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

  function logOut() {
    //@ts-ignore
    setSession({ session_token: undefined, session: undefined });
    setThisUser(undefined);
    setSleepDiary(undefined);
    setModules(undefined);
    storeCachedModules(undefined);
    storeLocalUser(undefined);
    storeSleepDiary(undefined);
    storeModuleIds(undefined);
    storeProgression([]);
    storeSleepRestriction(undefined);
    const removeSleepRestriction = async () => {
      try {
        await AsyncStorage.removeItem("Restriction");
      } catch (e) {
        console.error;
      }
    }
    const removeUserFromStorage = async () => {
      try {
        await AsyncStorage.removeItem("Local_user");
      } catch (e) {
        console.error;
      }
    };
    removeSleepRestriction();
    removeUserFromStorage();
    setTimeout(() => {
      //@ts-ignore
      navigation.navigate("login");
    }, 100);
  }

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
              {!edit ? <Text>Endre</Text> : <Text>Stop Endre</Text>}
            </Button>
          </View>
          {thisUser ? (
            <View>
              <Text style={style.fieldDescriptions}>Epost</Text>
              <TextField
                editable={edit}
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
                onChange={(arg: string) => {
                  setUser((prev) => ({ ...prev, dateOfBirth: arg }));
                }}
              />
              <Text style={style.fieldDescriptions}>Kjønn</Text>
              <TextField
                editable={edit}
                value={user.gender}
                onChange={(arg: string) => {
                  if (arg === ("male" || "female" || "other" || "undefined"))
                    setUser((prev) => ({ ...prev, gender: arg }));
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
                createUser(user, session?.identity.id);
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
