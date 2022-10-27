import React, { useState } from "react";
import { Text, View } from "react-native";
import { PageTemplate } from "../material/PageTemplate";
import { ProgressBar } from "../material/ProgressBar";
import { ModulePagePage } from "./ModulePagePage";
import { useRoute } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { moduleProgression } from "../../state/atoms";
import { Part } from "../../types/modules";
import { ModuleProgression } from "../../types/Types";

export function ModulePartPage() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const route = useRoute(); // @ts-ignore
  const part: Part = route.params.part
  const numberOfPages = part.pages.length;
  const [progression, setProgression] = useRecoilState(moduleProgression);

  function navigatePart(arg1: number) {
    const newProgressionList = [...progression]
    newProgressionList.forEach((mp, n) => {
      if (mp.module === part.module) {
        const newProgression: ModuleProgression = {
          module: mp.module,
          part: mp.part + arg1,
          finished: false
        }
        newProgressionList.splice(n, 1, newProgression)
        setProgression(newProgressionList)
        return
      }
    })
  }

  function navigatePage(arg1: number) {
    if (currentPage === 0 && arg1 === -1) return
    if (currentPage === (numberOfPages - 1) && arg1 === 1) return 
    setCurrentPage(currentPage + arg1)
  }

  return (
    <PageTemplate>
      <View style={{ margin: 5 }}>
        <Text style={{ fontSize: 18, paddingBottom: 5 }}>
          {part.title}
        </Text>
        <ProgressBar percentage={(currentPage / (numberOfPages - 1) ) * 100} />
      </View>
      <View>
        <ModulePagePage page={part.pages[currentPage]} navigatePage={navigatePage} pageProgression={currentPage/(numberOfPages - 1)} navigatePart={navigatePart}/>
      </View>
    </PageTemplate>
  );
}
