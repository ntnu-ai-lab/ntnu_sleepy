import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useEffect } from "react";
import { ModuleProgression, SleepRestriction, User } from "../types/Types";
import { DiaryEntry, Module, ModuleExpanded, SleepDiary } from "../types/modules";
import { useRecoilState } from "recoil";
import {
  cachedModules,
  cachedSleepDiary,
  cachedSleepDiaryEntry,
  loggedInUser,
  moduleIds,
  moduleProgression,
  mySleepRestriction,
} from "./atoms";

export async function storeLocalUser(user: User | undefined) {
  const userAsString = JSON.stringify(user);
  await AsyncStorage.setItem("Local_User", userAsString);
}

export async function storeCachedModules(modules: ModuleExpanded[] | undefined) {
  const modulesAsString = JSON.stringify(modules);
  await AsyncStorage.setItem("Modules", modulesAsString);
}

export async function storeSleepDiary(sleepDiary: SleepDiary | undefined) {
  const sleepDiaryAsString = JSON.stringify(sleepDiary);
  await AsyncStorage.setItem("SleepDiary", sleepDiaryAsString);
}
export async function storeSleepDiaryEntry(sleepDiaryEntry: DiaryEntry) {
  const sleepDiaryEntryAsString = JSON.stringify(sleepDiaryEntry);
  await AsyncStorage.setItem("SleepDiaryEntry", sleepDiaryEntryAsString);
}

export async function storeModuleIds(ids: Module[] | undefined) {
  const moduleIdsAsString = JSON.stringify(ids);
  await AsyncStorage.setItem("ModuleIds", moduleIdsAsString);
}

export async function storeProgression(progression: ModuleProgression[]) {
  const progressionAsString = JSON.stringify(progression);
  await AsyncStorage.setItem("Progression", progressionAsString);
}

export async function storeSleepRestriction(
  restriction: SleepRestriction | undefined
) {
  const restrictionAsString = JSON.stringify(restriction);
  await AsyncStorage.setItem("Restriction", restrictionAsString);
}

export function StorageController(props: {
  children: ReactNode | ReactNode[];
}) {
  const { children } = props;
  const [localUser, setLocalUser] = useRecoilState(loggedInUser);
  const [modules, setModules] = useRecoilState(cachedModules);
  const [sleepDiary, setSleepDiary] = useRecoilState(cachedSleepDiary);
  const [cachedModuleIds, setCachedModuleIds] = useRecoilState(moduleIds);
  const [progression, setProgression] = useRecoilState(moduleProgression);
  const [sleepDiaryEntry, setSleepDiaryEntry] = useRecoilState(
    cachedSleepDiaryEntry
  );
  const [restriction, setRestriction] = useRecoilState(mySleepRestriction);

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

    const modules: ModuleExpanded[] = await getData();
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
  async function getCachedSleepDiaryEntry() {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("sleep_diary_entry");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    const sleepDiaryEntry: DiaryEntry = await getData();
    if (sleepDiary != null) setSleepDiaryEntry(sleepDiaryEntry);
  }

  async function getCachedModuleIds() {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("ModuleIds");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    };
    const moduleIds: Module[] = await getData();
    if (moduleIds != null) setCachedModuleIds(moduleIds);
  }

  async function getMyProgression() {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("Progression");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    };
    const progression: ModuleProgression[] = await getData();
    if (progression != null) setProgression(progression);
  }

  async function getSleepRestriction() {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem("Restriction");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    const restriction: SleepRestriction = await getData();
    if (restriction != null) setRestriction(restriction);
  }

  useEffect(() => {
    getLocalUser();
    getCachedModules();
    getCachedSleepDiary();
    getCachedModuleIds();
    getMyProgression();
    getCachedSleepDiaryEntry();
    getSleepRestriction();
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

  useEffect(() => {
    if (progression != undefined) {
      try {
        storeProgression(progression);
      } catch (e) {
        console.error;
      }
    }
  }, [progression]);

  useEffect(() => {
    if (sleepDiary != undefined) {
      try {
        storeSleepDiary(sleepDiary);
      } catch (e) {
        console.error(e);
      }
    }
  }, [sleepDiary]);

  useEffect(() => {
    if (restriction != undefined) {
      try {
        storeSleepRestriction(restriction);
      } catch (e) {
        console.error(e);
      }
    }
  }, [restriction]);

  useEffect(() => {
    if (modules !== undefined) {
      try {
        storeCachedModules(modules)
      } catch (e) {
        console.error(e)
      }
    }
  })

  return <>{children}</>;
}
