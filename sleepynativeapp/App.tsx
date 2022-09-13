import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LoginPage } from "./components/LoginPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignupPage } from "./components/SignUpPage";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          statusBarTranslucent: true,
          statusBarColor: "transparent",
          animation: "none"
        }}
        initialRouteName="login"
        >
          <Stack.Screen name="login" component={LoginPage} />
          <Stack.Screen name="signup" component={SignupPage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
