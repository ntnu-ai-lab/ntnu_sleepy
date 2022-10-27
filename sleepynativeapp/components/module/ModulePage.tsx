import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { useModule } from "../../api/modulesApi";
import { moduleIds, moduleProgression } from "../../state/atoms";
import { colors } from "../../styles/styles";
import { ModuleExpanded } from "../../types/modules";
import { ModuleProgression } from "../../types/Types";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { PageTemplate } from "../material/PageTemplate";
import { ProgressBar } from "../material/ProgressBar";
import { ModulePartPage } from "./ModulePartPage";

export function ModulePage() {
  const cachedModuleIds = useRecoilValue(moduleIds);
  const progression = useRecoilValue(moduleProgression);

  function moduleToGet() {
    let id: string | undefined = undefined
    cachedModuleIds?.forEach((m) => {
      let finished = false
      let opened = false
      progression.forEach((p) => {
        if (m.id === p.module) {
          opened = true
          if (p.finished) finished = true
        }
      })
      if (!opened || !finished){
        id = id || m.id
        return
      }
    })
    if (id !== undefined) return id
    else return undefined
  }

  const module = useModule(moduleToGet());

  const Stack = createNativeStackNavigator();

  if (module.loading)
    return (
      <PageTemplate>
        <View>
          <Text>Loading</Text>
        </View>
      </PageTemplate>
    );

  if (module.error)
    return (
      <PageTemplate>
        <View>
          <Text>Error</Text>
        </View>
      </PageTemplate>
    );

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
        <Stack.Screen
          name="overview" //@ts-ignore
          children={() => <ModulePageOverview module={module.module} />}
        />
        <Stack.Screen name="part" component={ModulePartPage} />
      </Stack.Navigator>
    </PageTemplate>
  );
}

export function ModulePageOverview(props: { module: ModuleExpanded }) {
  const { module } = props;
  const navigation = useNavigation();
  const [progression, setProgression] = useRecoilState(moduleProgression);
  const currentPart =
    progression.find((mp) => mp.module === module.id)?.part ?? 0;

  function finishModule() {
    const newProgressionList = [...progression]
    newProgressionList.forEach((mp, n) => {
      if (mp.module === module.id) {
        const newProgression: ModuleProgression = {
          module: mp.module,
          part: mp.part,
          finished: true
        }
        newProgressionList.splice(n, 1, newProgression)
        setProgression(newProgressionList)
        return
      }
    })
  }

  return (
    <PageTemplate>
      <View style={{ marginHorizontal: 10, paddingTop: 10 }}>
        <Text style={{ fontSize: 16, paddingBottom: 5 }}>{module.title}</Text>
        {module.id === "0" ? <View /> : <ProgressBar percentage={(currentPart / module.parts.length) * 100} />}
      </View>
      <Card>
        {currentPart === module.parts.length ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: colors.text_white, fontSize: 20 }}>
              Modulen er fullført!
            </Text>
            <View style={{width: "100%"}}>
              <Button variant="contained" onClick={finishModule}>
                <Text>Neste Modul</Text>
              </Button>
            </View>
          </View>
        ) : (
          <View>
            <Text
              style={{
                color: colors.text_white,
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              {module.parts[currentPart].title}
            </Text>
            <Button
              variant="contained"
              onClick={() => {
                //@ts-ignore
                navigation.navigate("home", {
                  screen: "Home",
                  params: {
                    screen: "part",
                    params: { part: module.parts[currentPart] },
                  },
                });

                if (!progression.find((mp) => mp.module === module.id)) {
                  const newProgressionList = [...progression];
                  newProgressionList.push({
                    module: module.id,
                    part: 0,
                    finished: false
                  });
                  setProgression(newProgressionList);
                }
              }}
            >
              <Text>Start Del</Text>
            </Button>
          </View>
        )}
      </Card>
    </PageTemplate>
  );
}
