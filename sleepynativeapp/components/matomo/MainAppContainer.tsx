import { useMatomo } from "matomo-tracker-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../../state/atoms";

export const MainAppContainer = () => {
  const { trackAppStart } = useMatomo();
  const user = useRecoilState(loggedInUser);

  useEffect(() => {
    trackAppStart; //vil tracke det på brukeren
  }, []);

  return (
    <View>
      <Text>Main App</Text>
    </View>
  );
};
