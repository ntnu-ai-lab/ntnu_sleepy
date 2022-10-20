import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { colors } from "../../styles/styles";
import { testData } from "../../testing/testdata";
import { Module } from "../../types/modules";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { PageTemplate } from "../material/PageTemplate";
import { ProgressBar } from "../material/ProgressBar";
import { ModulePartPage } from "./ModulePartPage";

export function ModulePage(props: { module: Module }) {
  const { module } = props;

  const Stack = createNativeStackNavigator()

  return (
    <PageTemplate>
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            headerTransparent: true,
            statusBarTranslucent: true,
            statusBarColor: "transparent",
            animation: "none",
        }}
        initialRouteName="overview"
        >
            <Stack.Screen name="overview" children={() => <ModulePageOverview  module={testData}/>} />
            <Stack.Screen name="part" component={ModulePartPage} />
        </Stack.Navigator>
    </PageTemplate>
  );
}

export function ModulePageOverview(props: { module: Module }) {
    const { module } = props;
    const [currentPart, setCurrentPart] = useState(0);
    const navigation = useNavigation()
  
    return (
      <PageTemplate>
        <View style={{marginHorizontal: 10, paddingTop: 10}}>
          <Text style={{ fontSize: 16, paddingBottom: 5,  }}>
            Modul 1
          </Text>
          <ProgressBar
            percentage={(currentPart / (module.parts.length - 1)) * 100}
          />
        </View>
        <Card>
          <Text style={{color: colors.text_white, fontSize: 20, alignSelf: "center"}}>Del {currentPart}</Text>{/*@ts-ignore */}
          <Button variant="contained" onClick={() => {navigation.navigate("home", {screen: "Assignment", params: { screen: "part", params: {part: module.parts[0]}}})}}><Text>Start Del</Text></Button>
        </Card>
      </PageTemplate>
    );
  }
