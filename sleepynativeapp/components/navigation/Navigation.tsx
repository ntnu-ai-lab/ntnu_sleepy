import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { LoginPage } from "../pages/LoginPage";
import { TabNavigation } from "./TabNavigation";
import { SignupPage } from "../pages/SignUpPage";

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
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="home" component={TabNavigation} />
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
