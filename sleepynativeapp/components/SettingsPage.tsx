import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image } from "react-native";
import { Button, Card } from "react-native-paper";
import { PageTemplate } from "./PageTemplate";

export function SettingsPage() {
  const navigation = useNavigation();

  return (
    <PageTemplate>
      <View></View>
      <Card>
        <Card.Cover
          source={{ uri: "https://somnus.idi.ntnu.no/static/bed.jpg" }}
          style={{ width: "50%", maxHeight: "50%", alignSelf: "center" }}
        />
      </Card>
    </PageTemplate>
  );
}
