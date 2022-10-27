import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRecoilState } from "recoil";
import { cachedModules } from "../../state/atoms";
import { Alert } from "../material/Alert";
import { Button } from "../material/Button";
import { Card } from "../material/Card";
import { PageTemplate } from "../material/PageTemplate";
import { ModulePartPage } from "../module/ModulePartPage";

export function HistoryPage() {
  //legg til progress når det er lagret i state hvor i treningen brukeren er
  const navigation = useNavigation();
  const [thisModules] = useRecoilState(cachedModules);
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <PageTemplate>
      <View>
        {thisModules?.map((m, i) => {
          return (
            <Card key={m.id}>
              <Text>{m.title}</Text>
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
