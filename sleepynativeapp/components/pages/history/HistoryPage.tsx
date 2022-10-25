import { StackActions, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { getAllModules } from "../../../api/modulesApi";
import { Module } from "../../../types/modules";
import { Button } from "../../material/Button";
import { Card } from "../../material/Card";
import { PageTemplate } from "../../material/PageTemplate";
import { ModulePartPage } from "../../module/ModulePartPage";

export function HistoryPage() {
  //finne en måte å hente ut hvor langt man har kommer i modulene
  const [modules, setModules] = useState<Module[]>();
  const navigation = useNavigation();

  const getModules = async () => {
    const allModules = getAllModules();
    setModules(await allModules);
  };

  useEffect(() => {
    getModules;
  }, []);

  return (
    <PageTemplate>
      <View>
        {modules?.map((m, i) => {
          return (
            <Card key={m.id}>
              <Text>Modul {i.toString()}</Text>
              <Button
                onClick={() => {
                  //@ts-ignore
                  navigation.navigate("home", {
                    screen: "History",
                    params: {
                      screen: "modulePart",
                      params: { part: m.parts[0] },
                    },
                  });
                }}
              >
                <Text>Se modul</Text>
              </Button>
            </Card>
          );
        })}
      </View>
    </PageTemplate>
  );
}

export function HistoryNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ height: "100%" }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          statusBarTranslucent: true,
          statusBarColor: "transparent",
          animation: "none",
        }}
        initialRouteName="moduleHistory"
      >
        <Stack.Screen name="moduleHistory" component={HistoryPage} />
        <Stack.Screen name="modulePart" component={ModulePartPage} />
      </Stack.Navigator>
    </View>
  );
}
