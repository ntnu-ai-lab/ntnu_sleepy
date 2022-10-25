import { PageTemplate } from "../material/PageTemplate";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserEx } from "../../types/Types";
import { AuthContext } from "../../auth/AuthProvider";
import { getTest } from "../../api/userApi";
import { useRecoilValue } from "recoil";
import { loggedInUser } from "../../state/atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "../material/Alert";
import { Card } from "../material/Card";
import { Button } from "../material/Button";
import { TextField } from "../material/TextField";

export function ProfilePage() {
  const thisUser = useRecoilValue(loggedInUser);
  const user = thisUser ? thisUser : UserEx
  const { sessionToken, session, setSession } = useContext(AuthContext);
  const navigation = useNavigation();
  const [openAlert, setOpenAlert] = useState(false)

  const style = StyleSheet.create({
    fieldDescriptions: {
      textTransform: "uppercase",
      fontSize: 12,
      color: colors.text_secondary
    }
  })

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
    setTimeout(() => {
      //@ts-ignore
      navigation.navigate("login");
    }, 100);
  }

  return (
    <PageTemplate>
      <Card style={{ margin: 10 }}>
        <View style={{ marginBottom: 10 }}>
            <Text style={{color: colors.text_white, fontSize: 24, marginBottom: 15}}>Din Profil:</Text>
            <Text style={style.fieldDescriptions}>Epost</Text>
            <TextField
              editable={false}
              value={user.email}
            />
            <Text style={style.fieldDescriptions}>Navn</Text>
            <TextField
              value={user.name}
              editable={false}
            /><Text style={style.fieldDescriptions}>Fødselsdato</Text>
            <TextField
              editable={false}
              value={user.dateOfBirth}
            />
            <Text style={style.fieldDescriptions}>Kjønn</Text>
            <TextField editable={false}
              value={user.gender}
            />
            <Text style={style.fieldDescriptions}>Yrke</Text>
            <TextField editable={false}
              value={user.occupation} />
        </View>
        <Button
          variant="contained"
          onClick={() => {
            logOut();
          }}
        >
          <Text style={{fontSize: 18}}>Logg ut</Text>
        </Button>
        <Button
          onClick={() => {
            if (sessionToken && session)
              getTest("d10e1d18-db25-4e47-ab19-efad53248123").then(r => {
                if (r === 0) {
                  setOpenAlert(true)
                }
              });
          }}
        >
          <Text style={{color: colors.text_white}}>Test</Text>
        </Button>
      </Card>

      <View style={{ height: 80, width: "100%" }} />
      <Alert type={"alert"} content={"Klarte ikke å hente test, dette kan skyldes mangel på internett, eller mangel på kompetanse fra vår side"} open={openAlert} setOpen={setOpenAlert}/>
    </PageTemplate>
  );
}
