import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRecoilValue } from "recoil";
import { useModule } from "../../api/modulesApi";
import { moduleIds } from "../../state/atoms";
import { colors } from "../../styles/styles";
import { Module } from "../../types/modules";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { PageTemplate } from "../material/PageTemplate";
import { ProgressBar } from "../material/ProgressBar";
import { ModulePartPage } from "./ModulePartPage";

export function ModulePage() {
  const cachedModuleIds = useRecoilValue(moduleIds);

  const module = useModule(cachedModuleIds?.[0].id);

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

export function ModulePageOverview(props: { module: Module }) {
  const { module } = props;
  const [currentPart, setCurrentPart] = useState(0);
  const navigation = useNavigation();

  return (
    <PageTemplate>
      <View style={{ marginHorizontal: 10, paddingTop: 10 }}>
        <Text style={{ fontSize: 16, paddingBottom: 5 }}>Modul 1</Text>
        <ProgressBar
          percentage={(currentPart / (module.parts.length - 1)) * 100}
        />
      </View>
      <Card>
        <Text
          style={{
            color: colors.text_white,
            fontSize: 20,
            alignSelf: "center",
          }}
        >
          Del {currentPart}
        </Text>
        <Button
          variant="contained"
          onClick={() => {
            //@ts-ignore
            navigation.navigate("home", {
              screen: "Home",
              params: { screen: "part", params: { part: module.parts[0] } },
            });
          }}
        >
          <Text>Start Del</Text>
        </Button>
      </Card>
    </PageTemplate>
  );
}
