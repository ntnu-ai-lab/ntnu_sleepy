import { PageTemplate } from "../material/PageTemplate";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserEx } from "../../types/Types";
import { AuthContext } from "../../auth/AuthProvider";
import { getUserByIdentiyId } from "../../api/userApi";
import { useRecoilState } from "recoil";
import { cachedSleepDiary, loggedInUser } from "../../state/atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "../material/Alert";
import { Card } from "../material/Card";
import { Button } from "../material/Button";
import { TextField } from "../material/TextField";
import { storeCachedModules, storeLocalUser, storeSleepDiary } from "../../state/StorageController";

export function ProfilePage() {
  const [thisUser, setThisUser] = useRecoilState(loggedInUser);
  const [, setSleepDiary] = useRecoilState(cachedSleepDiary);
  const [, setModules] = useRecoilState(cachedSleepDiary);
  const { sessionToken, session, setSession } = useContext(AuthContext);
  const navigation = useNavigation();
  const [openAlert, setOpenAlert] = useState(false);

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

    const removeUserFromStorage = async () => {
      try {
        await AsyncStorage.removeItem("Local_user");
      } catch (e) {
        console.error;
      }
    };
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
          <Text
            style={{ color: colors.text_white, fontSize: 24, marginBottom: 15 }}
          >
            Din Profil:
          </Text>
          {
            thisUser ? (<View><Text style={style.fieldDescriptions}>Epost</Text>
            <TextField editable={false} value={thisUser.email} />
            <Text style={style.fieldDescriptions}>Navn</Text>
            <TextField value={thisUser.name} editable={false} />
            <Text style={style.fieldDescriptions}>Fødselsdato</Text>
            <TextField editable={false} value={thisUser.dateOfBirth} />
            <Text style={style.fieldDescriptions}>Kjønn</Text>
            <TextField editable={false} value={thisUser.gender} />
            <Text style={style.fieldDescriptions}>Yrke</Text>
            <TextField editable={false} value={thisUser.occupation} /></View>) : <View />
          }
        </View>
        <Button
          variant="contained"
          onClick={() => {
            logOut();
          }}
        >
          <Text style={{ fontSize: 18 }}>Logg ut</Text>
        </Button>
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
