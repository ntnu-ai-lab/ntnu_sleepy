import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { SignupPage } from "./SignUpPage";
import { TestModulePage } from "./TestModulePage";

export function Navigation() {
    const Stack = createNativeStackNavigator();
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              headerTransparent: true,
              statusBarTranslucent: true,
              statusBarColor: "transparent",
              animation: "none",
            }}
            initialRouteName="login"
          >
            <Stack.Screen name="login" component={LoginPage} />
            <Stack.Screen name="signup" component={SignupPage} />
            <Stack.Screen name="profile" component={ProfilePage} />
            <Stack.Screen name="testmodule" component={TestModulePage} />
            <Stack.Screen name="home" component={TestModulePage} />
            <Stack.Screen name="settings" component={TestModulePage} />
            <Stack.Screen name="assignments" component={TestModulePage} />
            <Stack.Screen name="statistics" component={TestModulePage} />
            <Stack.Screen name="tools" component={TestModulePage} />
          </Stack.Navigator>
        </NavigationContainer>
    )
}