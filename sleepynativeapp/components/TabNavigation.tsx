import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfilePage } from "./ProfilePage";
import { SettingsPage } from "./SettingsPage";
import { colors } from "../styles/styles";
import { QuestionnairePage } from "./QuestionnairePage";
import { ModulePagePage } from "./module/ModulePagePage";
import { SleepDiaryPage } from "./SleepDiaryPage";

export function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === "Hjem") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Innstillinger") {
              iconName = focused ? "cog" : "cog-outline";
            } else if (route.name === "Profil") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "Moduler") {
              iconName = focused ? "barbell" : "barbell-outline";
            } else if (route.name === "Søvndagbok") {
              iconName = focused ? "bed" : "bed-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: "gray",
          headerShown: true,
        })}
      >
        <Tab.Screen
          name="Hjem"
          component={QuestionnairePage}
          options={{ tabBarLabel: "Hjem" }}
        />
        <Tab.Screen
          name="Søvndagbok"
          component={SleepDiaryPage}
          options={{ tabBarLabel: "Søvndagbok" }}
        />
        <Tab.Screen
          name="Moduler"
          component={ModulePagePage}
          options={{ tabBarLabel: "Moduler" }}
        />
        <Tab.Screen
          name="Innstillinger"
          component={SettingsPage}
          options={{ tabBarLabel: "Innstillinger" }}
        />

        <Tab.Screen
          name="Profil"
          component={ProfilePage}
          options={{ tabBarLabel: "Profil" }}
        />
      </Tab.Navigator>
    </>
  );
}
