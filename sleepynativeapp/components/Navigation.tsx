import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { GeneralPage } from "./GeneralPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { SignupPage } from "./SignUpPage";
import { TestModulePage } from "./TestModulePage";

export function Navigation() {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated } = useContext(AuthContext);

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
        {isAuthenticated ? (
          <>
            <Stack.Screen name="profile" component={ProfilePage} />
            <Stack.Screen name="home" component={HomePage} />
            <Stack.Screen name="tools" component={TestModulePage} />
            <Stack.Screen name="assignment" component={GeneralPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="profile" component={ProfilePage} />

            <Stack.Screen name="login" component={LoginPage} />
            <Stack.Screen name="tools" component={TestModulePage} />
            <Stack.Screen name="signup" component={SignupPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
