import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useEffect } from "react";
import { User } from "../types/Types";
import { Module, SleepDiary } from "../types/modules";
import { useRecoilState } from "recoil";
import { cachedModules, cachedSleepDiary, loggedInUser, moduleIds } from "./atoms";

export async function storeLocalUser(user: User | undefined) {
  const userAsString = JSON.stringify(user);
  await AsyncStorage.setItem("Local_User", userAsString);
}

export async function storeCachedModules(modules: Module[] | undefined) {
  const modulesAsString = JSON.stringify(modules);
  await AsyncStorage.setItem("Modules", modulesAsString);
}

export async function storeSleepDiary(sleepDiary: SleepDiary | undefined) {
  const sleepDiaryAsString = JSON.stringify(sleepDiary);
  await AsyncStorage.setItem("SleepDiary", sleepDiaryAsString);
}

export async function storeModuleIds(ids: Module[] | undefined) {
  const moduleIdsAsString = JSON.stringify(ids);
  await AsyncStorage.setItem("ModuleIds", moduleIdsAsString);
}

export function StorageController(props: {
  children: ReactNode | ReactNode[];
}) {
  const { children } = props;
  const [localUser, setLocalUser] = useRecoilState(loggedInUser);
  const [modules, setModules] = useRecoilState(cachedModules);
  const [sleepDiary, setSleepDiary] = useRecoilState(cachedSleepDiary);
  const [cachedModuleIds, setCachedModuleIds] = useRecoilState(moduleIds);

  async function getLocalUser() {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("Local_User");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    const user: User = await getData();
    if (user != null) setLocalUser(user);
  }

  async function getCachedModules() {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("Modules");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    const modules: Module[] = await getData();
    if (modules != null) setModules(modules);
  }

  async function getCachedSleepDiary() {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("sleep_diary");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    const sleepDiary: SleepDiary = await getData();
    if (sleepDiary != null) setSleepDiary(sleepDiary);
  }

  async function getCachedModuleIds() {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("ModuleIds");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    const moduleIds: Module[] = await getData();
    if (moduleIds != null) setCachedModuleIds(moduleIds)
  }

  useEffect(() => {
    getLocalUser();
    getCachedModules();
    getCachedSleepDiary();
    getCachedModuleIds();
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
