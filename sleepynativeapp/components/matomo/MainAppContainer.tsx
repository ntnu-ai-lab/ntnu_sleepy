import { useMatomo } from "matomo-tracker-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";

export const MainAppContainer = () => {
  const { trackAppStart } = useMatomo();

  useEffect(() => {
    trackAppStart;
  }, []);

  return <View>Main App</View>;
};
