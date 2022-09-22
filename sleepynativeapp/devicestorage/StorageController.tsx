import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useEffect } from "react";
import { DjangoUser } from "../helpers/Types";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../state/atoms";

export async function storeLocalUser(user: DjangoUser) {
  const userAsString = JSON.stringify(user);
  await AsyncStorage.setItem("Local_User", userAsString);
}

export function StorageController(props: {
  children: ReactNode | ReactNode[];
}) {
  const { children } = props;
  const [localUser, setLocalUser] = useRecoilState(loggedInUser);

  async function getLocalUser() {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("Local_User");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    const user: DjangoUser = await getData();
    if (user != null) setLocalUser(user);
  }

  useEffect(() => {
    getLocalUser();
  }, []);

  useEffect(() => {
    if (localUser != undefined) {
      try {
        storeLocalUser(localUser);
      } catch (e) {
        console.error;
      }
    }
  }, [localUser]);

  return <>{children}</>;
}
