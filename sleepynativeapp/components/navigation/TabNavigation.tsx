import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfilePage } from "../pages/ProfilePage";
import { SettingsPage } from "../pages/SettingsPage";
import { colors } from "../../styles/styles";
import { QuestionnairePage } from "../pages/QuestionnairePage";
import { ModulePagePage } from "../module/ModulePagePage";
import { testData } from "../../testing/testdata";

export function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "Assignment") {
              iconName = focused ? "bar-chart" : "bar-chart-outline";
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
          name="Profile"
          component={ProfilePage}
          options={{ tabBarLabel: "Profile" }}
        />
        <Tab.Screen
          name="Home"
          component={QuestionnairePage}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsPage}
          options={{ tabBarLabel: "Settings" }}
        />
        <Tab.Screen
          name="Assignment"
          children={() => <ModulePagePage page={testData.pages[0]}/>}
          options={{ tabBarLabel: "Assignment" }}
        />
      </Tab.Navigator>
    </>
  );
}
