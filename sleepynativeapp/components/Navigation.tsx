import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { SignupPage } from "./SignUpPage";

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
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={LoginPage} />
            <Stack.Screen name="signup" component={SignupPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
