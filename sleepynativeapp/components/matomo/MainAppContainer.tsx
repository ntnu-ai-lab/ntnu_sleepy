import { useMatomo } from "matomo-tracker-react-native";
import React, { ReactNode, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../../state/atoms";

export const MainAppContainer = (props: {
  children: ReactNode | ReactNode[];
}) => {
  const { trackAppStart } = useMatomo();
  const user = useRecoilState(loggedInUser);
  const {children} = props

  useEffect(() => {
    trackAppStart; //vil tracke det på brukeren
  }, []);

  return (
    <>
      {children}
    </>
  );
};
