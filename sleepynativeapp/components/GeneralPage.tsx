import React from "react";
import { Card } from "./material/Card";
import { View, Text, StyleSheet } from "react-native";
import { PageTemplate } from "./PageTemplate";
import { useNavigation } from "@react-navigation/native";
import { NavBar } from "./material/NavBar";
import { colors } from "../styles/styles";
import { TestModuleComponent } from "./TestModuleComponents";
import { Video, AVPlaybackStatus } from "expo-av";
import { Button } from "react-native-paper";
import TestVideo from "./TestVideo";
import { VideoSectionComponent } from "./module/VideoSectionComponent";

//page for general tips for sleeping. Should be available to all users when logged in.
export function GeneralPage() {
  const navigation = useNavigation();

  /* const styles = StyleSheet.create({
        text: {
            color: colors.text_white
        }
    }) */

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const styles = StyleSheet.create({
    text: {
      color: colors.text_white,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#ecf0f1",
    },
    video: {
      alignSelf: "center",
      width: 320,
      height: 200,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <PageTemplate>
      <View>
        <Card style={{ padding: 50 }}>
          <Text style={styles.text}>Sov i gjennomsnitt 8 timer hver dag</Text>
          <Text style={styles.text}>
            Ikke bruk skjerm på mobil,tablet eller laptop 2 timer før leggetid
          </Text>
          <Text style={styles.text}>Bruk sengen kun til soving</Text>
        </Card>
        <Card>
          <TestModuleComponent />
        </Card>
      </View>
    </PageTemplate>
  );
}
