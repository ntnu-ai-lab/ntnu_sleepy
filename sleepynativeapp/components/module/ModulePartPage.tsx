import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PageTemplate } from "../material/PageTemplate";
import { ProgressBar } from "../material/ProgressBar";
import { ModulePagePage } from "./ModulePagePage";
import { useRoute } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { cachedModules, moduleProgression } from "../../state/atoms";
import { ModuleExpanded, Part } from "../../types/modules";
import { ModuleProgression } from "../../types/Types";

export function ModulePartPage() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const route = useRoute(); // @ts-ignore
  const part: Part = route.params.part; // @ts-ignore
  const isHistory: boolean = route.params.isHistory;
  const numberOfPages = part.pages.length;
  const [progression, setProgression] = useRecoilState(moduleProgression);
  const [history, setHistory] = useRecoilState(cachedModules);

  async function addPartToHistory() {
    const newHistory = [...history];
    newHistory.forEach((m, i) => {
      if (m.id === part.module) {
        const newPartList = [...m.parts];
        if (!newPartList.map((p) => p.id).includes(part.id))
          newPartList.push(part);
        const newModule: ModuleExpanded = { ...m, parts: newPartList };
        newHistory.splice(i, 1, newModule);
      }
    });
    setHistory(newHistory);
  }

  useEffect(() => {
    addPartToHistory();
  }, []);

  function navigatePart(arg1: number) {
    if (!isHistory) {
      const newProgressionList = [...progression];
      newProgressionList.forEach((mp, n) => {
        if (mp.module === part.module) {
          const newProgression: ModuleProgression = {
            module: mp.module,
            part: mp.part + arg1,
            finished: false,
          };
          newProgressionList.splice(n, 1, newProgression);
          setProgression(newProgressionList);
          return;
        }
      });
    }
  }

  function navigatePage(arg1: number) {
    if (currentPage === 0 && arg1 === -1) return;
    if (currentPage === numberOfPages - 1 && arg1 === 1) return;
    setCurrentPage(currentPage + arg1);
  }

  return (
    <PageTemplate>
      <View style={{ margin: 5 }}>
        <Text style={{ fontSize: 18, paddingBottom: 5 }}>{part.title}</Text>
        <ProgressBar percentage={(currentPage / (numberOfPages - 1)) * 100} />
      </View>
      <View>
        <ModulePagePage
          page={part.pages[currentPage]}
          navigatePage={navigatePage}
          pageProgression={numberOfPages === 1 ? 2 :currentPage / (numberOfPages - 1)}
          navigatePart={navigatePart}
        />
      </View>
    </PageTemplate>
  );
}
