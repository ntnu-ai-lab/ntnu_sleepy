import { useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { cachedModules, moduleProgression } from "../../state/atoms";
import { colors } from "../../styles/styles";
import { ModuleExpanded } from "../../types/modules";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { PageTemplate } from "../material/PageTemplate";
import { ModulePartPage } from "./ModulePartPage";

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: colors.text_white,
    alignSelf: "center",
  },
  breadText: {
    color: `${colors.text_white}EF`
  }
});

export function HistoryPage() {
  const navigation = useNavigation();
  const finishedModules = useRecoilValue(cachedModules);

  return (
    <PageTemplate>
      {finishedModules?.length === 0 ? <View>
          <Card>
            <Text style={[styles.heading, {marginBottom: 15}]}>Ingen moduler å vise</Text>
            <Text style={styles.breadText}>Du har ikke sett på noen moduler enda, gå gjennom de i Hjem og så vil de dukke opp her.</Text>
          </Card>
        </View> : <View />}
      <View style={{ flexDirection: "column-reverse" }}>
        {finishedModules?.map((m) => {
          return (
            <Card key={m.id}>
              <Text style={styles.heading}>{m.title}</Text>
              <Button
                variant="contained"
                onClick={() => {
                  //@ts-ignore
                  navigation.navigate("home", {
                    screen: "History",
                    params: {
                      screen: "modulePartOverview",
                      params: { module: m },
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

export function HistoryModulePartOverview() {
  const route = useRoute(); //@ts-ignore
  const module: ModuleExpanded = route.params.module;
  const navigation = useNavigation();

  return (
    <PageTemplate>
      <View>
        {module?.parts.length === 0 ? <View>
          <Card>
            <Text style={[styles.heading, {marginBottom: 15}]}>Ingen deler å vise</Text>
            <Text style={styles.breadText}>Du har ikke sett på noen å delene i denne module, gå gjennom de i Hjem og så vil de dukke opp her.</Text>
          </Card>
        </View> : <View />}
        {module?.parts.map((p, i) => {
          return (
            <Card key={p.id + i}>
              <Text style={styles.heading}>{p.title}</Text>
              <Button
                variant="contained"
                onClick={() => {
                  //@ts-ignore
                  navigation.navigate("home", {
                    screen: "History",
                    params: {
                      screen: "modulePart",
                      params: { part: p, isHistory: true },
                    },
                  });
                }}
              >
                <Text>Se del</Text>
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
        <Stack.Screen
          name="modulePartOverview"
          component={HistoryModulePartOverview}
        />
        <Stack.Screen name="modulePart" component={ModulePartPage} />
      </Stack.Navigator>
    </View>
  );
}
