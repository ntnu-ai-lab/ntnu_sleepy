import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image } from "react-native";
import { Button, Card } from "react-native-paper";
import { IconButton } from "./material/IconButton";
import { NavBar } from "./material/NavBar";
import { PageTemplate } from "./PageTemplate";

export function SettingsPage() {
  const navigation = useNavigation();

  return (
    <PageTemplate>
      <View></View>
      <Card>
        <Card.Content>
          <Card.Actions style={{ alignSelf: "center" }}>
            <Button
              onPress={() => {
                //@ts-ignore
                navigation.navigate("login");
              }}
            >
              logout
            </Button>
          </Card.Actions>
        </Card.Content>
        <Card.Cover
          source={{ uri: "http://static.somnus.kehofseth.no/bed.jpg" }}
          style={{ width: "50%", maxHeight: "50%", alignSelf: "center" }}
        />
      </Card>
    </PageTemplate>
  );
}
